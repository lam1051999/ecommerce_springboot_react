package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartChangeRequest {
    @JsonProperty("product_id")
    private String productId;

    @JsonProperty("amount")
    private Integer amount;

    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private ShoppingCartChangeType type;
}
