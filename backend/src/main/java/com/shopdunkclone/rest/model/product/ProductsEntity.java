package com.shopdunkclone.rest.model.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "products", schema = "shopdunk")
public class ProductsEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Basic
    @Column(name = "extra_product_type")
    @JsonProperty("extra_product_type")
    private String extraProductType;

    @Basic
    @Column(name = "extra_strap_type")
    @JsonProperty("extra_strap_type")
    private String extraStrapType;

    @Basic
    @Column(name = "extra_gpu_type")
    @JsonProperty("extra_gpu_type")
    private String extraGpuType;

    @Basic
    @Column(name = "extra_storage_type")
    @JsonProperty("extra_storage_type")
    private String extraStorageType;

    @Basic
    @Column(name = "extra_color_type")
    @JsonProperty("extra_color_type")
    private String extraColorType;

    @Basic
    @Column(name = "extra_ram_type")
    @JsonProperty("extra_ram_type")
    private String extraRamType;

    @Basic
    @Column(name = "extra_model_type")
    @JsonProperty("extra_model_type")
    private String extraModelType;

    @Basic
    @Column(name = "extra_screen_size")
    @JsonProperty("extra_screen_size")
    private String extraScreenSize;

    @Basic
    @Column(name = "actual_price")
    @JsonProperty("actual_price")
    private Long actualPrice;

    @Basic
    @Column(name = "old_price")
    @JsonProperty("old_price")
    private Long oldPrice;

    @Basic
    @Column(name = "showcase_image")
    @JsonProperty("showcase_image")
    private String showcaseImage;

    @Basic
    @Column(name = "product_type")
    @JsonProperty("product_type")
    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Basic
    @Column(name = "product_sub_type")
    @JsonProperty("product_sub_type")
    private String productSubType;

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
}
