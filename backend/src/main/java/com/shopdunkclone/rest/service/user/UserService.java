package com.shopdunkclone.rest.service.user;

import com.shopdunkclone.rest.dto.user.CustomerInfosDto;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.repository.user.CustomersRepository;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.TokenType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    CustomersRepository customersRepository;
    @Autowired
    JwtService jwtService;

    public ServiceResult<CustomerInfosDto> getCustomerInfos(String jwt) {
        String username = jwtService.extractUsername(jwt, TokenType.TOKEN);
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
}
