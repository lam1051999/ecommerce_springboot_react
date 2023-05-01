package com.shopdunkclone.rest.controller.v1.auth;

import com.shopdunkclone.rest.dto.auth.AuthenticationRequest;
import com.shopdunkclone.rest.dto.auth.AuthenticationResponse;
import com.shopdunkclone.rest.dto.auth.RefreshTokenRequest;
import com.shopdunkclone.rest.dto.auth.RegisterRequest;
import com.shopdunkclone.rest.exception.TokenExpiredException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.service.auth.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "Refresh token")
    @PostMapping("/refresh-token")
    public ResponseEntity<ServiceResult<AuthenticationResponse>> refreshToken(
            @RequestBody RefreshTokenRequest request
    ) throws TokenExpiredException {
        ServiceResult<AuthenticationResponse> result = authenticationService.refreshToken(request);
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
