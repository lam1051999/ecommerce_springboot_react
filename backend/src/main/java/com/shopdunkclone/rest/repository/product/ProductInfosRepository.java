package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.ProductInfosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductInfosRepository extends JpaRepository<ProductInfosEntity, String> {
    Optional<ProductInfosEntity> findProductInfosEntityByProductId(String productId);
}
