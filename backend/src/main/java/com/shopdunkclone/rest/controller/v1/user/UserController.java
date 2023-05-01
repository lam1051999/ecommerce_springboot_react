package com.shopdunkclone.rest.controller.v1.user;

import com.shopdunkclone.rest.dto.user.CustomerInfosDto;
import com.shopdunkclone.rest.model.ServiceResult;
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
    @GetMapping(value = "/customer-infos")
    public ResponseEntity<ServiceResult<CustomerInfosDto>> getCustomerInfos(@RequestHeader(value="Authorization") String bearerToken) {
        String jwt = bearerToken.substring(7);
        ServiceResult<CustomerInfosDto> result = userService.getCustomerInfos(jwt);
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
