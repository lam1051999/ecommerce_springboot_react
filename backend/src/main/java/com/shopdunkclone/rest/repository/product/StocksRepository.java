package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.StocksEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StocksRepository extends JpaRepository<StocksEntity, String> {
    List<StocksEntity> findByProductIdIn(List<String> productId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE `stocks` SET quantity=quantity - :order_quantity WHERE product_id=:product_id ;", nativeQuery = true)
    void updateStockAfterOrder(@Param("order_quantity") Integer order_quantity, @Param("product_id") String product_id);
}
