package com.shopdunkclone.rest.controller.v1.user;

import com.shopdunkclone.rest.dto.user.CustomerInfosDto;
import com.shopdunkclone.rest.dto.user.CustomerInfosRequest;
import com.shopdunkclone.rest.dto.user.PasswordChangeRequest;
import com.shopdunkclone.rest.dto.user.ShipAddressesRequest;
import com.shopdunkclone.rest.exception.InvalidRequestException;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import com.shopdunkclone.rest.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

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
        ServiceResult<String> result = userService.createCustomerShipAddresse(request, bearerToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Xoá thông tin địa chỉ nhận của khách hàng")
    @DeleteMapping("/customer-infos/ship-addresses/{id}")
    public ResponseEntity<ServiceResult<String>> deleteCustomerShipAddresses(
            @PathVariable(name = "id") String id,
            @RequestHeader(value = "Authorization") String bearerToken
    ) {
        ServiceResult<String> result = userService.deleteCustomerShipAddresse(id, bearerToken);
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

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        // This code protects Spring Core from a "Remote Code Execution" attack (dubbed "Spring4Shell").
        // By applying this mitigation, you prevent the "Class Loader Manipulation" attack vector from firing.
        // For more details, see this post: https://www.lunasec.io/docs/blog/spring-rce-vulnerabilities/
        String[] blackList = {"class.*", "Class.*", "*.class.*", ".*Class.*"};
        binder.setDisallowedFields(blackList);
    }
}
