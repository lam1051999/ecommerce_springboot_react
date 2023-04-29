package com.shopdunkclone.rest.model.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product_infos", schema = "shopdunk")
public class ProductInfosEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "product_desc")
    @JsonProperty("product_desc")
    private String productDesc;

    @Basic
    @Column(name = "product_spec")
    @JsonProperty("product_spec")
    private String productSpec;

    @Basic
    @Column(name = "product_detail")
    @JsonProperty("product_detail")
    private String productDetail;

    @Basic
    @Column(name = "product_qna")
    @JsonProperty("product_qna")
    private String productQna;

    @Basic
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
