package com.shopdunkclone.rest.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImagesDto {
    @JsonProperty("color")
    String color;

    @JsonProperty("list_images")
    List<String> listImages;
}
