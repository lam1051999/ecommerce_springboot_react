package com.shopdunkclone.rest.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDto {
    @JsonProperty("total_pages")
    Integer totalPages;

    @JsonProperty("total_elements")
    Long totalElements;

    @JsonProperty("list_products")
    List<ProductsEntity> listProducts;
}
