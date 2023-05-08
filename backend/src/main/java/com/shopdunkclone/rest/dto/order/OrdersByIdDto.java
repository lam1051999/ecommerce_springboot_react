package com.shopdunkclone.rest.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.order.OrdersEntity;
import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersByIdDto {
    @JsonProperty("order_detail")
    private OrdersEntity orderDetail;

    @JsonProperty("ship_address_detail")
    private ShipAddressesEntity shipAddressDetail;

    @JsonProperty("ordered_items")
    private List<ShoppingCartItem> orderedItems;
}
