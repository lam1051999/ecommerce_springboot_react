package com.shopdunkclone.rest.repository.order;

import com.shopdunkclone.rest.model.order.ProductOrdersEntity;
import com.shopdunkclone.rest.model.order.ProductOrdersPk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductOrdersRepository extends JpaRepository<ProductOrdersEntity, ProductOrdersPk> {
}
