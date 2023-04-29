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
    @Column(name = "address")
    @JsonProperty("address")
    private String address;

    @Basic
    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @Basic
    @Column(name = "customer_id")
    @JsonProperty("customer_id")
    private String customerId;

    @Basic
    @Column(name = "province_id")
    @JsonProperty("province_id")
    private String provinceId;
}
