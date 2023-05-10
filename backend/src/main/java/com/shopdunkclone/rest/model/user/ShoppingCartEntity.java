package com.shopdunkclone.rest.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@IdClass(ShoppingCartPk.class)
@Table(name = "shopping_cart", schema = "shopdunk")
public class ShoppingCartEntity {
    @Id
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Id
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;

    @Basic
    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;
}
