package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.ProductImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImagesRepository extends JpaRepository<ProductImagesEntity, String> {
    List<ProductImagesEntity> findAllByProductId(String productId);
}
