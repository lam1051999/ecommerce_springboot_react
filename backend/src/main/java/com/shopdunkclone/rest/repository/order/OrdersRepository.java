package com.shopdunkclone.rest.repository.order;

import com.shopdunkclone.rest.model.order.OrdersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<OrdersEntity, String> {
    List<OrdersEntity> findAllByUsername(String username);
    Optional<OrdersEntity> findByIdAndUsername(String id, String username);
}
