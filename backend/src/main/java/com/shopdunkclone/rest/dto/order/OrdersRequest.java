package com.shopdunkclone.rest.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.order.Payment;
import com.shopdunkclone.rest.model.order.ReceiveType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersRequest {
    @JsonProperty("receive_type")
    @Enumerated(EnumType.STRING)
    private ReceiveType receiveType;

    @JsonProperty("total_price")
    private Long totalPrice;

    @JsonProperty("is_extract_receipt")
    private Integer isExtractReceipt;

    @JsonProperty("payment")
    @Enumerated(EnumType.STRING)
    private Payment payment;

    @JsonProperty("ship_address_id")
    private String shipAddressId;

    @JsonProperty("list_products_in_order")
    private List<ShoppingCartItem> listProductsInOrder;
}
