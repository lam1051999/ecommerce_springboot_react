package com.shopdunkclone.rest.repository.address;

import com.shopdunkclone.rest.model.address.ShopdunkShopsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopdunkShopsRepository extends JpaRepository<ShopdunkShopsEntity, String> {
}
