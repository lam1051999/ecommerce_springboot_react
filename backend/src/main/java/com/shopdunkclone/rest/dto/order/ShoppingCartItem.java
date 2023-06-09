package com.shopdunkclone.rest.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartItem {
    @JsonProperty("products_entity")
    private ProductsEntity productsEntity;

    @JsonProperty("quantity")
    private Integer quantity;
}
