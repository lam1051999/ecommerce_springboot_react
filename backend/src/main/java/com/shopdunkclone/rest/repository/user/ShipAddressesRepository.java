package com.shopdunkclone.rest.repository.user;

import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipAddressesRepository extends JpaRepository<ShipAddressesEntity, String> {
    List<ShipAddressesEntity> findAllByUsername(String username);
    @Transactional
    long deleteByIdAndUsername(String id, String username);
    Optional<ShipAddressesEntity> findByIdAndUsername(String id, String username);
    @Modifying
    @Transactional
    @Query(value = """
            UPDATE `ship_addresses` SET name=:name, phone_number=:phone_number, email=:email,
            exact_address=:exact_address, province_id=:province_id
            WHERE id=:id AND username=:username ;""", nativeQuery = true)
    void updateCustomerShipAddressesById(
            @Param("id") String id,
            @Param("name") String name,
            @Param("phone_number") String phone_number,
            @Param("email") String email,
            @Param("exact_address") String exact_address,
            @Param("province_id") String province_id,
            @Param("username") String username
    );
}