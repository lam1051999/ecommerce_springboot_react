package com.shopdunkclone.rest.model.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductOrdersPk {
    @Id
    @Column(name = "order_id")
    @JsonProperty("order_id")
    private String orderId;

    @Id
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
