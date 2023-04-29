package com.shopdunkclone.rest.model.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product_orders", schema = "shopdunk")
public class ProductOrdersEntity {
    @Basic
    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Id
    @Column(name = "order_id")
    @JsonProperty("order_id")
    private String orderId;

    @Id
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
