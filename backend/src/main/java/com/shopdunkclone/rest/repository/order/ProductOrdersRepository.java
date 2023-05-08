package com.shopdunkclone.rest.repository.order;

import com.shopdunkclone.rest.model.order.ProductOrdersEntity;
import com.shopdunkclone.rest.model.order.ProductOrdersPk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOrdersRepository extends JpaRepository<ProductOrdersEntity, ProductOrdersPk> {
    List<ProductOrdersEntity> findAllByOrderId(String orderId);
}
