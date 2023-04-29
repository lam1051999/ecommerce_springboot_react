package com.shopdunkclone.rest.repository.address;

import com.shopdunkclone.rest.model.address.ProvincesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvincesRepository extends JpaRepository<ProvincesEntity, String> {
}
