package com.shopdunkclone.rest.repository.user;

import com.shopdunkclone.rest.model.user.ShoppingCartEntity;
import com.shopdunkclone.rest.model.user.ShoppingCartPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCartEntity, ShoppingCartPk> {
    Optional<ShoppingCartEntity> findByUsernameAndProductId(String username, String productId);
    @Transactional
    void deleteByUsernameAndProductId(String username, String productId);
    @Transactional
    void deleteByUsername(String username);
    List<ShoppingCartEntity> findAllByUsername(String username);
    @Modifying
    @Transactional
    @Query(value = """
            UPDATE `shopping_cart` SET quantity = quantity + :amount
            WHERE username = :username AND product_id = :product_id ;""", nativeQuery = true)
    void updateCartItem(@Param("username") String username,
                        @Param("product_id") String productId,
                        @Param("amount") Integer amount);
}
