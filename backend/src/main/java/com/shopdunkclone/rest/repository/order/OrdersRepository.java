package com.shopdunkclone.rest.repository.order;

import com.shopdunkclone.rest.model.order.OrdersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<OrdersEntity, String> {
}
