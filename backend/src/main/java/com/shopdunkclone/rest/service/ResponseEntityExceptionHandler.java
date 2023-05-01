package com.shopdunkclone.rest.service;

import com.shopdunkclone.rest.exception.InvalidRequestException;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.exception.TokenExpiredException;
import com.shopdunkclone.rest.model.ServiceResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ResponseEntityExceptionHandler {
    @ExceptionHandler(InvalidRequestException.class)
    public final ResponseEntity<ServiceResult<Object>> handleInvalidRequestException(InvalidRequestException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundRecordException.class)
    public final ResponseEntity<ServiceResult<Object>> handleNotFoundRecordException(NotFoundRecordException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public final ResponseEntity<ServiceResult<Object>> handleMissingRequestBody(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage().split(":")[0]
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<ServiceResult<Object>> handleInvalidRequestBody(MethodArgumentNotValidException ex) {
        List<String> sb = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            sb.add(fieldName + ": " + errorMessage);
        });
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                String.join(", ", sb)
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SQLException.class)
    public final ResponseEntity<ServiceResult<Object>> handleSqlException(SQLException ex) {
        String exMessage = ex.getMessage();
        if (exMessage.contains("Duplicate entry")) {
            return new ResponseEntity<>(getErrorServiceResult(
                    ServiceResult.Status.FAILED,
                    "Username already exists"
            ), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public final ResponseEntity<ServiceResult<Object>> handleSqlBadParameter(MethodArgumentTypeMismatchException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                "Request parameters not compatible"
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public final ResponseEntity<ServiceResult<Object>> handleTokenExpired(TokenExpiredException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseEntity<ServiceResult<Object>> handleNotFoundUsername(UsernameNotFoundException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    public final ResponseEntity<ServiceResult<Object>> handleAuthenticationError(AuthenticationException ex) {
        return new ResponseEntity<>(getErrorServiceResult(
                ServiceResult.Status.FAILED,
                ex.getMessage()
        ), HttpStatus.UNAUTHORIZED);
    }

    public ServiceResult<Object> getErrorServiceResult(ServiceResult.Status status, String message) {
        return new ServiceResult<>(status, message, null);
    }
}
