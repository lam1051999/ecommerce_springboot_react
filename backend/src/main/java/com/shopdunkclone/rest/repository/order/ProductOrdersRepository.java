package com.shopdunkclone.rest.repository.order;

import com.shopdunkclone.rest.model.order.ProductOrdersEntity;
import com.shopdunkclone.rest.model.order.ProductOrdersPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOrdersRepository extends JpaRepository<ProductOrdersEntity, ProductOrdersPk> {
    List<ProductOrdersEntity> findAllByOrderId(String orderId);
}
