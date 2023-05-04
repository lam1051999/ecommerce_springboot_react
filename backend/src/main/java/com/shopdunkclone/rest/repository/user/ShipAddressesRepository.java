package com.shopdunkclone.rest.repository.user;

import com.shopdunkclone.rest.model.user.ShipAddressesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShipAddressesRepository extends JpaRepository<ShipAddressesEntity, String> {
    List<ShipAddressesEntity> findAllByUsername(String username);
    @Transactional
    long deleteByIdAndUsername(String id, String username);
}
