package com.shopdunkclone.rest.controller.v1.address;

import com.shopdunkclone.rest.dto.address.ProvinceAddressDto;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.service.address.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@Tag(name = "Shopdunk Backend API Address V1")
public class AddressController {
    @Autowired
    AddressService addressService;

    @Operation(summary = "Lấy thông tin các tỉnh và cửa hàng shopdunk")
    @GetMapping(value = "/provinces")
    public ResponseEntity<ServiceResult<List<ProvinceAddressDto>>> getProvinceAddress() {
        ServiceResult<List<ProvinceAddressDto>> result = addressService.getProvinceAddress();
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
