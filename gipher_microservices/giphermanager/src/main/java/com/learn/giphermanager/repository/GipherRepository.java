package com.learn.giphermanager.repository;

import com.learn.giphermanager.model.Gipher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GipherRepository extends MongoRepository<Gipher, String>
{

    @Query("{email: ?0}")
    List<Gipher> findByEmail2(String email);
}
