package com.learn.giphermanager.service;

import com.learn.giphermanager.exception.GipherExistsException;
import com.learn.giphermanager.exception.GipherNotFoundExeption;
import com.learn.giphermanager.model.Gipher;

import java.util.List;
import java.util.Optional;

public interface GipherService
{
    Gipher saveGipher(Gipher gipher) throws GipherExistsException;


    List<Gipher> getAllGifs() throws GipherNotFoundExeption;


    List<Gipher> getUserGifsbyEmail2(String email);
}
