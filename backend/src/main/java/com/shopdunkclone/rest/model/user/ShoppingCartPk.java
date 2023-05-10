package com.shopdunkclone.rest.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ShoppingCartPk {
    @Id
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Id
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
