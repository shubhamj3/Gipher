package com.example.GipherBackend.service;

import com.example.GipherBackend.exception.InvalidCredetialsException;
import com.example.GipherBackend.exception.UserExistsException;
import com.example.GipherBackend.exception.UserNotFoundException;
import com.example.GipherBackend.model.UserCredentials;
import com.example.GipherBackend.model.UserRegister;

import java.util.Map;

public interface UserService {


    UserRegister registerUser(UserRegister user) throws UserExistsException;

    Map<String,String> authenticateUser(UserCredentials userCredentials) throws UserNotFoundException, InvalidCredetialsException;


    UserRegister updateUser(UserRegister user)throws UserExistsException;
}
