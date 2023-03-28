package com.learn.giphermanager.controller;

import com.learn.giphermanager.exception.GipherExistsException;
import com.learn.giphermanager.exception.GipherNotFoundExeption;
import com.learn.giphermanager.model.Gipher;
import com.learn.giphermanager.service.GipherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/gipher/")

public class GipherController {

    @Autowired
    private GipherService gipherService;

    public GipherController(GipherService gipherService) {
        this.gipherService = gipherService;
    }


    @PostMapping("save")
    public ResponseEntity<?> saveGipher(@RequestBody Gipher gipher)
    {
        Gipher savedGipger=null;
        try{
            savedGipger=gipherService.saveGipher(gipher);
            return new ResponseEntity<>(savedGipger, HttpStatus.CREATED);
        } catch (GipherExistsException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


    @GetMapping(path = "/getusergifs", params = "email")
    public List<Gipher> getAllContactsByCategory(@RequestParam String email){
        return gipherService.getUserGifsbyEmail2(email);
    }


    @GetMapping("getall")
    public ResponseEntity<?> getAllGifs() throws GipherNotFoundExeption {
        return new ResponseEntity<>(gipherService.getAllGifs(), HttpStatus.OK);

    }
}
