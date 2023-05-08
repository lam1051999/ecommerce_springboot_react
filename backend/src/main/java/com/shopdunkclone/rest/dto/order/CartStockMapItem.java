package com.shopdunkclone.rest.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartStockMapItem {
    @JsonProperty("product_id")
    private String productId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("order_quantity")
    private Integer orderQuantity;

    @JsonProperty("stocks_quantity")
    private Integer stocksQuantity;
}
