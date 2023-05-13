package com.shopdunkclone.rest.controller.v1.product;

import com.shopdunkclone.rest.dto.product.ProductImagesDto;
import com.shopdunkclone.rest.dto.product.ProductRatingsDto;
import com.shopdunkclone.rest.dto.product.ProductsDto;
import com.shopdunkclone.rest.dto.product.SortType;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.product.ProductInfosEntity;
import com.shopdunkclone.rest.model.product.ProductType;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import com.shopdunkclone.rest.service.product.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/")
@Tag(name = "Shopdunk Backend API Product V1")
public class ProductController {
    @Autowired
    ProductService productService;

    @Operation(summary = "Lấy thông tin các sản phẩm dựa vào danh mục")
    @GetMapping(value = "/products")
    public ResponseEntity<ServiceResult<ProductsDto>> getProducts(
            @Parameter(example = "RANDOM", description = "sort_type") @RequestParam(name = "sort_type") SortType sortType,
            @Parameter(example = "IPHONE", description = "product_type") @RequestParam(name = "product_type") ProductType productType,
            @Parameter(example = "IPHONE_SUB_TYPE_IPHONE_14_SERIES", description = "product_sub_type") @RequestParam(name = "product_sub_type", required = false) String productSubType,
            @Parameter(example = "0") @RequestParam(name = "page") int page,
            @Parameter(example = "10") @RequestParam(name = "size") int size
    ) {
        ServiceResult<ProductsDto> result = productService.getProducts(page, size, sortType, productType, productSubType);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy thông tin sản phẩm nhất định")
    @GetMapping(value = "/products/{id}")
    public ResponseEntity<ServiceResult<ProductsEntity>> getProductById(
            @Parameter(example = "eeead5b3bbcebf6d64f56a2efa6a8785", description = "id", required = true) @PathVariable(name = "id") String id
    ) throws NotFoundRecordException {
        ServiceResult<ProductsEntity> result = productService.getProductById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy ảnh theo từng sản phầm")
    @GetMapping(value = "/product-images")
    public ResponseEntity<ServiceResult<List<ProductImagesDto>>> getProductImages(
            @Parameter(example = "a89305813493dfe82319b53dcd736b0b", description = "product_id") @RequestParam(name = "product_id") String productId
    ) {
        ServiceResult<List<ProductImagesDto>> result = productService.getProductImages(productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy thông tin từng sản phầm")
    @GetMapping(value = "/product-infos")
    public ResponseEntity<ServiceResult<ProductInfosEntity>> getProductInfos(
            @Parameter(example = "a89305813493dfe82319b53dcd736b0b", description = "product_id") @RequestParam(name = "product_id") String productId
    ) throws NotFoundRecordException {
        ServiceResult<ProductInfosEntity> result = productService.getProductInfos(productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @Operation(summary = "Lấy đánh giá từng sản phầm")
    @GetMapping(value = "/product-ratings")
    public ResponseEntity<ServiceResult<ProductRatingsDto>> getProductRatings(
            @Parameter(example = "a89305813493dfe82319b53dcd736b0b", description = "product_id") @RequestParam(name = "product_id") String productId
    ) {
        ServiceResult<ProductRatingsDto> result = productService.getProductRatings(productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Lấy danh sách sản phẩm tìm kiếm")
    @GetMapping(value = "/product-search")
    public ResponseEntity<ServiceResult<ProductsDto>> getProductSearch(
            @Parameter(example = "iphone", description = "search_text") @RequestParam(name = "search_text") String searchText,
            @Parameter(example = "0") @RequestParam(name = "page") int page,
            @Parameter(example = "10") @RequestParam(name = "size") int size,
            @Parameter(example = "RANDOM", description = "sort_type") @RequestParam(name = "sort_type") SortType sortType
    ) {
        ServiceResult<ProductsDto> result = productService.getProductSearch(page, size, sortType, searchText);
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
