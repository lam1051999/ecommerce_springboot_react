package com.shopdunkclone.rest.model.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product_images", schema = "shopdunk")
public class ProductImagesEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "color")
    @JsonProperty("color")
    private String color;

    @Basic
    @Column(name = "source")
    @JsonProperty("source")
    private String source;

    @Basic
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
