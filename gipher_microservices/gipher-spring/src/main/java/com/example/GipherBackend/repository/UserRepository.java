package com.example.GipherBackend.repository;

import com.example.GipherBackend.model.UserRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserRegister,String> {

    boolean existsByEmail(String email);
    Optional<UserRegister> getUserByEmail(String email);

}
