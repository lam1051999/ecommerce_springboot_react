package com.shopdunkclone.rest.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.product.ProductRatingsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRatingsDto {
    @JsonProperty("num_reviews")
    Integer numReviews;

    @JsonProperty("average_num_stars")
    Double averageNumStars;

    @JsonProperty("num_5_stars")
    Integer num5Stars;

    @JsonProperty("num_4_stars")
    Integer num4Stars;

    @JsonProperty("num_3_stars")
    Integer num3Stars;

    @JsonProperty("num_2_stars")
    Integer num2Stars;

    @JsonProperty("num_1_stars")
    Integer num1Stars;

    @JsonProperty("list_reviews")
    List<ProductRatingsEntity> listReviews;
}
