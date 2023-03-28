package com.example.GipherBackend.controller;

import com.example.GipherBackend.exception.InvalidCredetialsException;
import com.example.GipherBackend.exception.UserNotFoundException;
import com.example.GipherBackend.model.UserCredentials;
import com.example.GipherBackend.model.UserRegister;
import com.example.GipherBackend.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/*@CrossOrigin*/
@RestController
@RequestMapping("api/v1/user/")

public class UserController {

    HashMap<String, String> map = new HashMap<>();

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("register")
    public ResponseEntity<?> userRegister(@RequestBody UserRegister user){
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserRegister user)   {
        return  new ResponseEntity<>(userService.updateUser(user), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials userCredentials)throws UserNotFoundException, InvalidCredetialsException {

        Map<String, String> token = userService.authenticateUser(userCredentials);
        logger.debug("user {} authenticated successfully", userCredentials.getEmail());
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

        @PostMapping("auth/authenticate")
        public ResponseEntity<?> isAuthenticate(ServletRequest request) throws ServletException {

            HttpServletRequest req = (HttpServletRequest) request;

            String authHeader = req.getHeader("Authorization");

            if(authHeader ==  null || !authHeader.startsWith("Bearer ")) {
                throw new ServletException("Authorization token is missing");
            }
            String token = authHeader.substring(7);
            final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
            req.setAttribute("claims", claims);
            HashMap<String, Boolean> map = new HashMap<>();
            map.clear();
            map.put("isAuthenticated", true);
            return new ResponseEntity<>(map,HttpStatus.OK);
        }



    }
