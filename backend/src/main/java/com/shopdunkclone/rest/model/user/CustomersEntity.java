package com.shopdunkclone.rest.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "customers", schema = "shopdunk")
public class CustomersEntity implements UserDetails {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Basic
    @Column(name = "gender")
    @JsonProperty("gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Basic
    @Column(name = "dob")
    @JsonProperty("dob")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Ho_Chi_Minh")
    private Date dob;

    @Basic
    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Basic
    @Column(name = "email")
    @JsonProperty("email")
    private String email;

    @Basic
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Basic
    @Column(name = "password")
    @JsonProperty("password")
    private String password;

    @Basic
    @Column(name = "role")
    @JsonProperty("role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
