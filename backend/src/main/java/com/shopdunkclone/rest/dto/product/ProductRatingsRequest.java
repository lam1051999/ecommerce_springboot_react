package com.shopdunkclone.rest.dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRatingsRequest {
    @Length(max = 1000)
    @JsonProperty("person_name")
    private String personName;

    @JsonProperty("review")
    private String review;

    @NotNull
    @JsonProperty("num_stars")
    private Integer numStars;

    @NotNull
    @JsonProperty("created")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private String created;

    @NotNull
    @Length(max = 32)
    @JsonProperty("product_id")
    private String productId;
}
