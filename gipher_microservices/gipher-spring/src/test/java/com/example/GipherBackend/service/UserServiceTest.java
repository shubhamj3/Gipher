package com.example.GipherBackend.service;

import com.example.GipherBackend.exception.UserExistsException;
import com.example.GipherBackend.exception.UserNotFoundException;
import com.example.GipherBackend.model.UserCredentials;
import com.example.GipherBackend.model.UserRegister;
import com.example.GipherBackend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository blogRepository;

    @InjectMocks
    private UserServiceImpl service;
    private UserRegister register;
    private UserCredentials credentials;


    @BeforeEach
    public void setUp() {


        register = new UserRegister("s@gmail.com","1234","saurabh");
        credentials = new UserCredentials("sam@gmail.com","sam123");

    }

    @AfterEach
    public void tearDown() {
        register = null;
    }

    @Test
    public void givenUserToSaveThenShouldReturnSavedUser() {
        when(blogRepository.save(any())).thenReturn(register);
        assertEquals(register, service.registerUser(register));
        verify(blogRepository, times(1)).save(any());
    }

    @Test
    public void givenUserToSaveThenShouldNotReturnSavedUser() {
        when(blogRepository.save(any())).thenThrow(new RuntimeException());
        Assertions.assertThrows(RuntimeException.class,() -> {
            service.registerUser(register);
        });
        verify(blogRepository, times(1)).save(any());
    }

    @Test
    public void givenUserDetailsWhenUserDoesNotExistThenReturnSaveUser() throws UserExistsException {

        when(blogRepository.existsByEmail("s@gmail.com")).thenReturn(false);
        when(blogRepository.save(any())).thenReturn(register);
        UserRegister user = service.registerUser(register);
        assertAll(
                ()->{assertNotNull(user);},
                ()->{assertTrue(user.getEmail().equals("s@gmail.com"));}

        );
        verify(blogRepository,atLeastOnce()).existsByEmail(anyString());
        verify(blogRepository,times(1)).save(any(UserRegister.class));

    }

    @Test
    public void givenUserDetailWhenUserExistThenThrowException(){

        when(blogRepository.existsByEmail("s@gmail.com")).thenReturn(true);
        assertThrows(UserExistsException.class,() ->service.registerUser(register));
        verify(blogRepository).existsByEmail(anyString());

    }

    @Test
    public void givenUserCredentialWhenDoesNotExistThenThrowException(){

        when(blogRepository.getUserByEmail(anyString()))
                .thenReturn(
                        Optional.empty()
                );
        assertThrows(UserNotFoundException.class,()->service.authenticateUser(credentials));
        verify(blogRepository).getUserByEmail(anyString());


    }

}