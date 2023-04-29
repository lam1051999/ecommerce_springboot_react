package com.shopdunkclone.rest.repository.user;

import com.shopdunkclone.rest.model.user.CustomersEntity;
import com.shopdunkclone.rest.model.user.Gender;
import com.shopdunkclone.rest.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Optional;

public interface CustomersRepository extends JpaRepository<CustomersEntity, String> {
    Optional<CustomersEntity> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `customers` (id, name, gender, dob, phone_number, email, username, password, role)\n" +
            "VALUES (:id, :name, :gender, :dob, :phone_number, :email, :username, :password, :role);", nativeQuery = true)
    void insert(@Param("id") String id,
                @Param("name") String name,
                @Param("gender") String gender,
                @Param("dob") String dob,
                @Param("phone_number") String phone_number,
                @Param("email") String email,
                @Param("username") String username,
                @Param("password") String password,
                @Param("role") String role);
}