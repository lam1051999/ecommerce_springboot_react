package com.shopdunkclone.rest.service.auth;

import com.shopdunkclone.rest.dto.auth.AuthenticationRequest;
import com.shopdunkclone.rest.dto.auth.AuthenticationResponse;
import com.shopdunkclone.rest.dto.auth.RegisterRequest;
import com.shopdunkclone.rest.dto.user.CustomersDto;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.model.user.Role;
import com.shopdunkclone.rest.repository.user.CustomersRepository;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.sql.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CustomersRepository customersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ServiceResult<AuthenticationResponse> register(RegisterRequest request) throws ParseException {
        CustomersEntity customersEntity = new CustomersEntity();
        String hashId = Utils.getHashText(request.getUsername());
        Date dob = Utils.getDateFromString(request.getDob(), Utils.dateFormat);
        customersEntity.setId(hashId);
        customersEntity.setName(request.getName());
        customersEntity.setGender(request.getGender());
        customersEntity.setDob(dob);
        customersEntity.setPhoneNumber(request.getPhoneNumber());
        customersEntity.setEmail(request.getEmail());
        customersEntity.setUsername(request.getUsername());
        customersEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        customersEntity.setRole(Role.USER);
        customersRepository.insert(
                customersEntity.getId(),
                customersEntity.getName(),
                customersEntity.getGender().toString(),
                request.getDob(),
                customersEntity.getPhoneNumber(),
                customersEntity.getEmail(),
                customersEntity.getUsername(),
                customersEntity.getPassword(),
                customersEntity.getRole().toString()
        );
        return getAuthenticationResponse(customersEntity);
    }

    public ServiceResult<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        CustomersEntity customersEntity = customersRepository.findByUsername(request.getUsername()).orElseThrow();
        return getAuthenticationResponse(customersEntity);
    }

    public ServiceResult<AuthenticationResponse> getAuthenticationResponse(CustomersEntity customersEntity) {
        String jwtToken = jwtService.generateToken(customersEntity);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", new AuthenticationResponse(jwtToken));
    }
}
