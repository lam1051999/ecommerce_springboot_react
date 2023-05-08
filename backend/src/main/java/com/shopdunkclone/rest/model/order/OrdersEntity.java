package com.shopdunkclone.rest.model.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orders", schema = "shopdunk")
public class OrdersEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "created")
    @JsonProperty("created")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp created;

    @Basic
    @Column(name = "modified")
    @JsonProperty("modified")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp modified;

    @Basic
    @Column(name = "receive_type")
    @JsonProperty("receive_type")
    @Enumerated(EnumType.STRING)
    private ReceiveType receiveType;

    @Basic
    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @Basic
    @Column(name = "is_extract_receipt")
    @JsonProperty("is_extract_receipt")
    private Integer isExtractReceipt;

    @Basic
    @Column(name = "payment")
    @JsonProperty("payment")
    @Enumerated(EnumType.STRING)
    private Payment payment;

    @Basic
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Basic
    @Column(name = "ship_address_id")
    @JsonProperty("ship_address_id")
    private String shipAddressId;

    @Basic
    @Column(name = "orders_status")
    @JsonProperty("orders_status")
    @Enumerated(EnumType.STRING)
    private OrdersStatus ordersStatus;

    @Basic
    @Column(name = "payment_status")
    @JsonProperty("payment_status")
    private PaymentStatus paymentStatus;
}
