package com.shopdunkclone.rest.service.user;

import com.shopdunkclone.rest.dto.user.CustomerInfosDto;
import com.shopdunkclone.rest.dto.user.CustomerInfosRequest;
import com.shopdunkclone.rest.dto.user.ShipAddressesRequest;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import com.shopdunkclone.rest.repository.user.CustomersRepository;
import com.shopdunkclone.rest.repository.user.ShipAddressesRepository;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.TokenType;
import com.shopdunkclone.rest.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    CustomersRepository customersRepository;
    @Autowired
    ShipAddressesRepository shipAddressesRepository;
    @Autowired
    JwtService jwtService;

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

    public ServiceResult<String> editCustomerInfos(CustomerInfosRequest oldInfo, String bearerToken) {
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
        String hashId = Utils.getHashText(request.getProvinceId() + "_" + request.getExactAddress() + "_" + username);
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

    public String getUsernameFromHeader(String bearerToken) {
        String jwt = bearerToken.substring(7);
        return jwtService.extractUsername(jwt, TokenType.TOKEN);
    }
}
