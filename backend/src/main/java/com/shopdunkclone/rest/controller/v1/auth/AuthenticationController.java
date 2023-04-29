package com.shopdunkclone.rest.controller.v1.auth;

import com.shopdunkclone.rest.dto.auth.AuthenticationRequest;
import com.shopdunkclone.rest.dto.auth.AuthenticationResponse;
import com.shopdunkclone.rest.dto.auth.RegisterRequest;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.service.auth.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Shopdunk Backend API Authentication V1")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Đăng ký thông tin người dùng")
    @PostMapping("/register")
    public ResponseEntity<ServiceResult<AuthenticationResponse>> register(
            @RequestBody RegisterRequest request
    ) throws ParseException {
        ServiceResult<AuthenticationResponse> result = authenticationService.register(request);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "Xác thực thông tin người dùng")
    @PostMapping("/authenticate")
    public ResponseEntity<ServiceResult<AuthenticationResponse>> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        ServiceResult<AuthenticationResponse> result = authenticationService.authenticate(request);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
