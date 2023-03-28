package com.example.GipherBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentials {

   // @NotBlank(message = "username is mandatory")
    //private  String username;

    @NotBlank(message = "Email is Mandatory")
    @Email(message = "Invalid Email")
    private String email;

    @NotBlank(message = "Password is mandatory should not be empty")
    private String password;

}
