package com.shopdunkclone.rest.repository.user;

import com.shopdunkclone.rest.model.user.CustomersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface CustomersRepository extends JpaRepository<CustomersEntity, String> {
    Optional<CustomersEntity> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO `customers` (id, name, gender, dob, phone_number, email, username, password, role)
            VALUES (:id, :name, :gender, :dob, :phone_number, :email, :username, :password, :role) ;""", nativeQuery = true)
    void insert(@Param("id") String id,
                @Param("name") String name,
                @Param("gender") String gender,
                @Param("dob") String dob,
                @Param("phone_number") String phone_number,
                @Param("email") String email,
                @Param("username") String username,
                @Param("password") String password,
                @Param("role") String role);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE `customers` SET name=:name, gender=:gender, dob=:dob, phone_number=:phone_number, email=:email
            WHERE username=:username ;""", nativeQuery = true)
    void updateCustomerInfos(
            @Param("name") String name,
            @Param("gender") String gender,
            @Param("dob") String dob,
            @Param("phone_number") String phone_number,
            @Param("email") String email,
            @Param("username") String username
    );

    @Modifying
    @Transactional
    @Query(value = "UPDATE `customers` SET password=:password WHERE username=:username ;", nativeQuery = true)
    void updatePassword(@Param("username") String username, @Param("password") String password);

    @Modifying
    @Transactional
    @Query(value = "UPDATE `customers` SET avatar=:avatar WHERE username=:username ;", nativeQuery = true)
    void updateCustomerAvatar(@Param("username") String username, @Param("avatar") String avatar);

    @Query(value = "SELECT avatar FROM `customers` WHERE username=:username ;", nativeQuery = true)
    String getCustomerAvatar(@Param("username") String username);
}