package com.shopdunkclone.rest.service.user;

import com.shopdunkclone.rest.dto.order.*;
import com.shopdunkclone.rest.dto.user.*;
import com.shopdunkclone.rest.exception.InvalidRequestException;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.order.OrdersEntity;
import com.shopdunkclone.rest.model.order.OrdersStatus;
import com.shopdunkclone.rest.model.order.PaymentStatus;
import com.shopdunkclone.rest.model.order.ProductOrdersEntity;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import com.shopdunkclone.rest.model.product.StocksEntity;
import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import com.shopdunkclone.rest.repository.order.OrdersRepository;
import com.shopdunkclone.rest.repository.order.ProductOrdersRepository;
import com.shopdunkclone.rest.repository.product.ProductsRepository;
import com.shopdunkclone.rest.repository.product.StocksRepository;
import com.shopdunkclone.rest.repository.user.CustomersRepository;
import com.shopdunkclone.rest.repository.user.ShipAddressesRepository;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.TokenType;
import com.shopdunkclone.rest.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    CustomersRepository customersRepository;
    @Autowired
    ShipAddressesRepository shipAddressesRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    StocksRepository stocksRepository;
    @Autowired
    ProductOrdersRepository productOrdersRepository;
    @Autowired
    ProductsRepository productsRepository;
    @Value("${nginx_images_path}")
    private String NGINX_IMAGES_PATH;

    public ServiceResult<CustomerInfosDto> getCustomerInfos(String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        CustomerInfosDto customerInfosDto = new CustomerInfosDto();
        CustomersEntity customersEntity = customersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        customerInfosDto.setName(customersEntity.getName());
        customerInfosDto.setGender(customersEntity.getGender());
        customerInfosDto.setDob(customersEntity.getDob());
        customerInfosDto.setPhoneNumber(customersEntity.getPhoneNumber());
        customerInfosDto.setEmail(customersEntity.getEmail());
        customerInfosDto.setUsername(username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", customerInfosDto);
    }

    public ServiceResult<String> updateCustomerInfos(CustomerInfosRequest oldInfo, String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        customersRepository.updateCustomerInfos(
                oldInfo.getName(),
                oldInfo.getGender().toString(),
                Utils.dateFormat.format(oldInfo.getDob()),
                oldInfo.getPhoneNumber(),
                oldInfo.getEmail(),
                username
        );
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Cập nhật thông tin khách hàng " + username + " thành công");
    }

    public ServiceResult<List<ShipAddressesEntity>> getCustomerShipAddresses(String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        List<ShipAddressesEntity> shipAddressesEntityList = shipAddressesRepository.findAllByUsername(username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", shipAddressesEntityList);
    }

    public ServiceResult<String> createCustomerShipAddresses(ShipAddressesRequest request, String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        ShipAddressesEntity shipAddressesEntity = new ShipAddressesEntity();
        String hashId = Utils.getHashText(username + "_" + System.currentTimeMillis());
        shipAddressesEntity.setId(hashId);
        shipAddressesEntity.setName(request.getName());
        shipAddressesEntity.setPhoneNumber(request.getPhoneNumber());
        shipAddressesEntity.setEmail(request.getEmail());
        shipAddressesEntity.setExactAddress(request.getExactAddress());
        shipAddressesEntity.setProvinceId(request.getProvinceId());
        shipAddressesEntity.setUsername(username);
        shipAddressesRepository.save(shipAddressesEntity);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", hashId);
    }

    public ServiceResult<String> deleteCustomerShipAddresses(String id, String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        long deletedRecords = shipAddressesRepository.deleteByIdAndUsername(id, username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Xoá địa chỉ lấy hàng cho khách hàng " + username + " thành công");
    }

    public ServiceResult<ShipAddressesEntity> getCustomerShipAddressesById(String id, String bearerToken) throws NotFoundRecordException {
        String username = getUsernameFromHeader(bearerToken);
        ShipAddressesEntity shipAddressesEntity = shipAddressesRepository.findByIdAndUsername(id, username).orElseThrow(() -> new NotFoundRecordException("Ship address not found"));
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", shipAddressesEntity);
    }

    public ServiceResult<String> updateCustomerShipAddressesById(String id, ShipAddressesRequest request, String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        shipAddressesRepository.updateCustomerShipAddressesById(id, request.getName(), request.getPhoneNumber(), request.getEmail(), request.getExactAddress(), request.getProvinceId(), username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Cập nhật địa chỉ lấy hàng cho khách hàng " + username + " thành công");
    }

    public ServiceResult<String> updateCustomerPassword(PasswordChangeRequest request, String bearerToken) throws InvalidRequestException {
        String username = getUsernameFromHeader(bearerToken);
        CustomersEntity customersEntity = customersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(passwordEncoder.matches(request.getOldPassword(), customersEntity.getPassword())){
            customersRepository.updatePassword(username, passwordEncoder.encode(request.getNewPassword()));
        } else {
            throw new InvalidRequestException("Password do not match");
        }
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Cập nhật mật khẩu cho khách hàng " + username + " thành công");
    }

    public ServiceResult<String> updateCustomerAvatar(MultipartFile file, String bearerToken) throws IOException {
        String username = getUsernameFromHeader(bearerToken);
        String userAvatarPathStr = NGINX_IMAGES_PATH + "/customers_images/" + username;
        Path userAvatarPath = Paths.get(userAvatarPathStr);
        if(!Files.exists(userAvatarPath)) {
            Files.createDirectories(userAvatarPath);
        }
        Path avatar = userAvatarPath.resolve(Objects.requireNonNull(file.getOriginalFilename()));
        OutputStream os = Files.newOutputStream(avatar);
        os.write(file.getBytes());
        customersRepository.updateCustomerAvatar(username, "/images/customers_images/" + username + "/" + file.getOriginalFilename());
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Tải lên avatar cho khách hàng " + username + " thành công");
    }

    public ServiceResult<String> deleteCustomerAvatar(String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        customersRepository.updateCustomerAvatar(username, null);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Xoá avatar khách hàng " + username + " thành công");
    }

    public ServiceResult<CustomerAvatarDto> getCustomerAvatar(String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        String avatar = customersRepository.getCustomerAvatar(username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", new CustomerAvatarDto(avatar));
    }

    @Transactional
    public ServiceResult<String> placeOrders(OrdersRequest request, String bearerToken) throws InvalidRequestException {
        String username = getUsernameFromHeader(bearerToken);
        List<StocksEntity> stocksEntities = stocksRepository.findByProductIdIn(request.getListProductsInOrder().stream().map(ShoppingCartItemNormalized::getProductId).toList());
        Map<String, ShoppingCartItemNormalized> shoppingCartItemMap = request.getListProductsInOrder().stream().collect(Collectors.toMap(ShoppingCartItemNormalized::getProductId, Function.identity()));
        Map<String, StocksEntity> stocksEntityMap = stocksEntities.stream().collect(Collectors.toMap(StocksEntity::getProductId, Function.identity()));
        List<CartStockMapItem> cartStockMapItems = new ArrayList<>();
        shoppingCartItemMap.keySet().forEach(key -> {
            ShoppingCartItemNormalized cartItem = shoppingCartItemMap.get(key);
            StocksEntity stocksItem = stocksEntityMap.get(key);
            if(stocksItem != null) {
                cartStockMapItems.add(new CartStockMapItem(key, cartItem.getName(), cartItem.getQuantity(), stocksItem.getQuantity()));
            } else {
                cartStockMapItems.add(new CartStockMapItem(key, cartItem.getName(), cartItem.getQuantity(), 0));
            }
        });
        if(cartStockMapItems.stream().allMatch(item -> item.getOrderQuantity() <= item.getStocksQuantity())) {
            // prepare order
            Timestamp placedAt = new Timestamp(System.currentTimeMillis());
            String orderId = Utils.getHashText(username + "_" + System.currentTimeMillis());
            OrdersEntity ordersEntity = new OrdersEntity();
            ordersEntity.setId(orderId);
            ordersEntity.setCreated(placedAt);
            ordersEntity.setModified(placedAt);
            ordersEntity.setReceiveType(request.getReceiveType());
            ordersEntity.setTotalPrice(request.getTotalPrice());
            ordersEntity.setIsExtractReceipt(request.getIsExtractReceipt());
            ordersEntity.setPayment(request.getPayment());
            ordersEntity.setShipAddressId(request.getShipAddressId());
            ordersEntity.setUsername(username);
            ordersEntity.setOrdersStatus(OrdersStatus.PROCESSING);
            ordersEntity.setPaymentStatus(PaymentStatus.PROCESSING);
            ordersRepository.save(ordersEntity);
            // prepare product orders
            List<ProductOrdersEntity> productOrdersEntityList = cartStockMapItems.stream().map(item -> new ProductOrdersEntity(
                    item.getOrderQuantity(),
                    orderId,
                    item.getProductId()
            )).toList();
            productOrdersRepository.saveAll(productOrdersEntityList);
            // update stocks
            cartStockMapItems.forEach(item -> {
                stocksRepository.updateStockAfterOrder(item.getOrderQuantity(), item.getProductId());
            });
            return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Tạo đơn cho khách hàng " + username + " thành công");
        } else {
            List<String> failedReasons = new ArrayList<>();
            cartStockMapItems.stream().filter(item -> item.getOrderQuantity() > item.getStocksQuantity())
                    .forEach(item -> {
                        failedReasons.add(item.getName() + " chỉ còn " + item.getStocksQuantity() + " sản phẩm");
                    });
            throw new InvalidRequestException("Tạo đơn thất bại, " + String.join(", ", failedReasons));
        }
    }

    public ServiceResult<List<OrdersEntity>> getOrders(String bearerToken) {
        String username = getUsernameFromHeader(bearerToken);
        List<OrdersEntity> ordersEntityList = ordersRepository.findAllByUsername(username);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", ordersEntityList);
    }

    public ServiceResult<OrdersByIdDto> getOrdersById(String id, String bearerToken) throws NotFoundRecordException {
        String username = getUsernameFromHeader(bearerToken);
        OrdersByIdDto ordersByIdDto = new OrdersByIdDto();
        OrdersEntity ordersEntity = ordersRepository.findByIdAndUsername(id, username).orElseThrow(() -> new NotFoundRecordException("Order not found"));
        ShipAddressesEntity shipAddressesEntity = shipAddressesRepository.findByIdAndUsername(ordersEntity.getShipAddressId(), username).orElseThrow(() -> new NotFoundRecordException("Ship address not found"));
        List<ProductOrdersEntity> productOrdersEntityList = productOrdersRepository.findAllByOrderId(id);
        List<ShoppingCartItem> orderedItems = new ArrayList<>();
        productOrdersEntityList.forEach(item -> {
            int quantity = item.getQuantity();
            String productId = item.getProductId();
            Optional<ProductsEntity> productsEntity = productsRepository.findProductsEntityByIdAndNameNotNull(productId);
            productsEntity.ifPresent(entity -> orderedItems.add(new ShoppingCartItem(entity, quantity)));
        });
        ordersByIdDto.setOrderDetail(ordersEntity);
        ordersByIdDto.setShipAddressDetail(shipAddressesEntity);
        ordersByIdDto.setOrderedItems(orderedItems);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", ordersByIdDto);
    }

    public String getUsernameFromHeader(String bearerToken) {
        String jwt = bearerToken.substring(7);
        return jwtService.extractUsername(jwt, TokenType.TOKEN);
    }
}
