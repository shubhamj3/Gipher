package com.example.GipherBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.math.BigInteger;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegister {

    @Id
    private String email;
    private String username;
    private String password;


}
