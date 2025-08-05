package com.webapp.coursefeedbacksystem.repository;

import com.webapp.coursefeedbacksystem.model.URLModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface URLRepository extends MongoRepository<URLModel, String> {

    public URLModel findByUrl(String url);
}
