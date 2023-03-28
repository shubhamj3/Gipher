package com.example.GipherBackend.service;

import com.example.GipherBackend.exception.InvalidCredetialsException;
import com.example.GipherBackend.exception.UserExistsException;
import com.example.GipherBackend.exception.UserNotFoundException;
import com.example.GipherBackend.model.UserCredentials;
import com.example.GipherBackend.model.UserRegister;
import com.example.GipherBackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {


    private UserRepository repository;
    private JwtGeneratorService jwtGeneratorService;
    private Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    public UserServiceImpl(UserRepository repository, JwtGeneratorService jwtGeneratorService) {
        this.repository = repository;
        this.jwtGeneratorService = jwtGeneratorService;
    }

    @Override
    public UserRegister registerUser(UserRegister user) {
        if(repository.existsByEmail(user.getEmail())){
            logger.error("User Already exists With Email {}",user.getEmail());
            throw new UserExistsException("User Already exists With Email");
        }
        logger.info("user register Successfully with email {}",user.getEmail());
        return repository.save(user);
    }

    @Override
    public Map<String, String> authenticateUser(UserCredentials userCredentials) throws UserNotFoundException,InvalidCredetialsException {

        logger.debug("Accessing database for getting user credentials");
        Optional<UserRegister> userByEmail = repository.getUserByEmail(userCredentials.getEmail());
        if(userByEmail.isEmpty()){
            logger.error("User not found with email : {}", userCredentials.getEmail());
            throw new UserNotFoundException("User not Found");
        }
        UserRegister user = userByEmail.get();
        if(user.getPassword().equals(userCredentials.getPassword())){
            logger.info("User authenticated successfully");
            String token = jwtGeneratorService.generateToken(userCredentials.getEmail());
            return Map.of("token", token,"username",user.getUsername());
        }else {
            logger.error("Password mismatch for user with email : {}", userCredentials.getEmail());
            throw new InvalidCredetialsException("Credentials Mismatch");
        }

    }
    @Override
    public UserRegister updateUser(UserRegister user){
        if(!repository.existsByEmail(user.getEmail())){
            throw new UserExistsException("User Is Not Valid");
        }
        return repository.save(user);
    }
}
