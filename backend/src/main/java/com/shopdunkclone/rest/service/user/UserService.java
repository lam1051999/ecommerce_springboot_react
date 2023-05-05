package com.shopdunkclone.rest.service.user;

import com.shopdunkclone.rest.dto.user.*;
import com.shopdunkclone.rest.exception.InvalidRequestException;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import com.shopdunkclone.rest.repository.user.CustomersRepository;
import com.shopdunkclone.rest.repository.user.ShipAddressesRepository;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.TokenType;
import com.shopdunkclone.rest.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

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

    public ServiceResult<String> createCustomerShipAddresse(ShipAddressesRequest request, String bearerToken) {
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
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", "Tạo địa chỉ lấy hàng cho khách hàng " + username + " thành công");
    }

    public ServiceResult<String> deleteCustomerShipAddresse(String id, String bearerToken) {
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
        Path resourceFolder = Paths.get(new ClassPathResource("/").getURL().getPath());
        Path userImagesFolder = Paths.get("static/images/customers_images/" + username);
        if(!Files.exists(resourceFolder.resolve(userImagesFolder))) {
            Files.createDirectories(resourceFolder.resolve(userImagesFolder));
        }
        Path avatar = resourceFolder.resolve(userImagesFolder).resolve(Objects.requireNonNull(file.getOriginalFilename()));
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

    public String getUsernameFromHeader(String bearerToken) {
        String jwt = bearerToken.substring(7);
        return jwtService.extractUsername(jwt, TokenType.TOKEN);
    }
}
