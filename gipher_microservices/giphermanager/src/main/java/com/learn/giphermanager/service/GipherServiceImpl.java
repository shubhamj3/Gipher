package com.learn.giphermanager.service;

import com.learn.giphermanager.exception.GipherExistsException;
import com.learn.giphermanager.exception.GipherNotFoundExeption;
import com.learn.giphermanager.model.Gipher;
import com.learn.giphermanager.repository.GipherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class GipherServiceImpl implements GipherService{


    private GipherRepository gipherRepository;

    @Autowired
    public GipherServiceImpl(GipherRepository gipherRepository) {
        this.gipherRepository = gipherRepository;
    }

    @Override
    public Gipher saveGipher(Gipher gipher) throws GipherExistsException {
        return gipherRepository.save(gipher);
    }

    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {     ///stateful filter
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }

    @Override
    public List<Gipher> getAllGifs() throws GipherNotFoundExeption {

        var DataGifer=gipherRepository.findAll().stream().filter(distinctByKey(Gipher::getGipherId)).collect(Collectors.toList());
        return DataGifer;
    }

    @Override
    public List<Gipher> getUserGifsbyEmail2(String email) {
        return gipherRepository.findByEmail2(email);
    }

}
