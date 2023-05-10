package com.shopdunkclone.rest.controller.v1.user;

import com.shopdunkclone.rest.dto.order.OrdersByIdDto;
import com.shopdunkclone.rest.dto.order.OrdersRequest;
import com.shopdunkclone.rest.dto.order.ShoppingCartItem;
import com.shopdunkclone.rest.dto.product.ProductRatingsRequest;
import com.shopdunkclone.rest.dto.user.*;
import com.shopdunkclone.rest.exception.InvalidRequestException;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.exception.UserNotAllowedException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.order.OrdersEntity;
import com.shopdunkclone.rest.model.product.ProductRatingsEntity;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import com.shopdunkclone.rest.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("api/v1/")
@Tag(name = "Shopdunk Backend API User V1")
public class UserController {
    @Autowired
    UserService userService;

    @Operation(summary = "Lấy thông khách hàng")
    @GetMapping(value = "/customer-infos/account")
    public ResponseEntity<ServiceResult<CustomerInfosDto>> getCustomerInfos(
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<CustomerInfosDto> result = userService.getCustomerInfos(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Sửa thông tin khách hàng")
    @PatchMapping("/customer-infos/account")
    public ResponseEntity<ServiceResult<String>> updateCustomerInfos(
            @RequestBody CustomerInfosRequest oldInfo,
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<String> result = userService.updateCustomerInfos(oldInfo, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Cập nhật mật khẩu mới cho tài khoản khách hàng")
    @PatchMapping("/customer-infos/password")
    public ResponseEntity<ServiceResult<String>> updateCustomerPassword(
            @RequestBody PasswordChangeRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws InvalidRequestException {
        ServiceResult<String> result = userService.updateCustomerPassword(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy thông tin địa chỉ nhận của khách hàng")
    @GetMapping("/customer-infos/ship-addresses")
    public ResponseEntity<ServiceResult<List<ShipAddressesEntity>>> getCustomerShipAddresses(
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<List<ShipAddressesEntity>> result = userService.getCustomerShipAddresses(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Tạo thông tin địa chỉ nhận của khách hàng")
    @PostMapping("/customer-infos/ship-addresses")
    public ResponseEntity<ServiceResult<String>> createCustomerShipAddresses(
            @RequestBody ShipAddressesRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<String> result = userService.createCustomerShipAddresses(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Xoá thông tin địa chỉ nhận của khách hàng")
    @DeleteMapping("/customer-infos/ship-addresses/{id}")
    public ResponseEntity<ServiceResult<String>> deleteCustomerShipAddresses(
            @PathVariable(name = "id") String id,
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<String> result = userService.deleteCustomerShipAddresses(id, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy thông tin địa chỉ nhận của khách hàng theo id")
    @GetMapping("/customer-infos/ship-addresses/{id}")
    public ResponseEntity<ServiceResult<ShipAddressesEntity>> getCustomerShipAddressesById(
            @PathVariable(name = "id") String id,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws NotFoundRecordException {
        ServiceResult<ShipAddressesEntity> result = userService.getCustomerShipAddressesById(id, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Cập nhật thông tin địa chỉ nhận của khách hàng")
    @PatchMapping("/customer-infos/ship-addresses/{id}")
    public ResponseEntity<ServiceResult<String>> updateCustomerShipAddressesById(
            @PathVariable(name = "id") String id,
            @RequestBody ShipAddressesRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<String> result = userService.updateCustomerShipAddressesById(id, request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Tải lên avatar của khách hàng")
    @PostMapping(value = "/customer-infos/avatar")
    public ResponseEntity<ServiceResult<String>> updateCustomerAvatar(
            @RequestParam(value = "avatar_file") MultipartFile file,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws IOException {
        ServiceResult<String> result = userService.updateCustomerAvatar(file, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Xoá lên avatar của khách hàng")
    @DeleteMapping(value = "/customer-infos/avatar")
    public ResponseEntity<ServiceResult<String>> deleteCustomerAvatar(
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws IOException {
        ServiceResult<String> result = userService.deleteCustomerAvatar(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy avatar của khách hàng")
    @GetMapping(value = "/customer-infos/avatar")
    public ResponseEntity<ServiceResult<CustomerAvatarDto>> getCustomerAvatar(
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<CustomerAvatarDto> result = userService.getCustomerAvatar(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Đặt đơn hàng")
    @PostMapping(value = "/customer-infos/orders")
    public ResponseEntity<ServiceResult<String>> placeOrders(
            @RequestBody OrdersRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws InvalidRequestException {
        ServiceResult<String> result = userService.placeOrders(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Lấy thông tin đơn hàng")
    @GetMapping(value = "/customer-infos/orders")
    public ResponseEntity<ServiceResult<List<OrdersEntity>>> getOrders(
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<List<OrdersEntity>> result = userService.getOrders(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy thông tin đơn hàng theo id")
    @GetMapping(value = "/customer-infos/orders/{id}")
    public ResponseEntity<ServiceResult<OrdersByIdDto>> getOrdersById(
            @PathVariable(name = "id") String id,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws NotFoundRecordException {
        ServiceResult<OrdersByIdDto> result = userService.getOrdersById(id, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy đánh giá đơn hàng")
    @GetMapping(value = "/customer-infos/ratings")
    public ResponseEntity<ServiceResult<List<ProductRatingsByUser>>> getProductRatingsByUser(
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<List<ProductRatingsByUser>> result = userService.getProductRatingsByUser(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Đánh giá đơn hàng")
    @PostMapping(value = "/customer-infos/ratings")
    public ResponseEntity<ServiceResult<String>> createProductRatings(
            @RequestBody @Valid ProductRatingsRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws ParseException, UserNotAllowedException {
        ServiceResult<String> result = userService.createProductRatings(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Thay đổi số lượng sản phẩm trong giỏ hàng")
    @PostMapping(value = "/customer-infos/shopping-cart")
    public ResponseEntity<ServiceResult<String>> changeShoppingCartQuantity(
            @RequestBody @Valid ShoppingCartChangeRequest request,
            @RequestHeader(value = "Authorization") String bearerToken
    ) throws InvalidRequestException {
        ServiceResult<String> result = userService.changeShoppingCartQuantity(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Lấy các sản phẩm trong giỏ hàng")
    @GetMapping(value = "/customer-infos/shopping-cart")
    public ResponseEntity<ServiceResult<List<ShoppingCartItem>>> getShoppingCartItems(
            @RequestHeader(value = "Authorization") String bearerToken
    ){
        ServiceResult<List<ShoppingCartItem>> result = userService.getShoppingCartItems(bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        // This code protects Spring Core from a "Remote Code Execution" attack (dubbed "Spring4Shell").
        // By applying this mitigation, you prevent the "Class Loader Manipulation" attack vector from firing.
        // For more details, see this post: https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities/
        String[] blackList = {"class.*", "Class.*", "*.class.*", ".*Class.*"};
        binder.setDisallowedFields(blackList);
    }
}
