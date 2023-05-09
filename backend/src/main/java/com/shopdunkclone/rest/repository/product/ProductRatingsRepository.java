package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.ProductRatingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRatingsRepository extends JpaRepository<ProductRatingsEntity, String> {
    List<ProductRatingsEntity> findAllByProductId(String productId);
    List<ProductRatingsEntity> findAllByUsername(String username);
}
