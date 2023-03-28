package com.example.GipherBackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler{

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<?> userAlreadyExists(UserExistsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }
        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<?> userNotFound(UserNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
        @ExceptionHandler(InvalidCredetialsException.class)
        public ResponseEntity<?> InvalidCredential(InvalidCredetialsException e) {
        return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }
}
