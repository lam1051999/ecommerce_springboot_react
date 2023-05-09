package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.product.ProductRatingsEntity;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRatingsByUser {
    @JsonProperty("rating_detail")
    private ProductRatingsEntity ratingDetail;

    @JsonProperty("product_detail")
    private ProductsEntity productDetail;
}
