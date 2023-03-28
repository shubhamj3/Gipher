package com.learn.giphermanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Gipher
{
    @Id
    private String gipherId;
    private  String embedURL;
    private String email;


    public Gipher() {
    }

    public Gipher(String gipherId, String embedURL,String email) {
        this.gipherId = gipherId;
        this.embedURL = embedURL;
        this.email =  email;

    }

    public String getGipherId() {
        return gipherId;
    }

    public void setGipherId(String gipherId) {
        this.gipherId = gipherId;
    }

    public String getEmbedURL() {
        return embedURL;
    }

    public void setEmbedURL(String embedURL) {
        this.embedURL = embedURL;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
