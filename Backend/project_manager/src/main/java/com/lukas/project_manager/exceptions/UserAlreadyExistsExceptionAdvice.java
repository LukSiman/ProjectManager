package com.lukas.project_manager.exceptions;

import com.lukas.project_manager.controller.UploadResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.ResponseEntity.status;

@ControllerAdvice
public class UserAlreadyExistsExceptionAdvice {

    // Handle username already exists
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<UploadResponseMessage> userAlreadyExists() {
        return status(HttpStatus.BAD_REQUEST)
                .body(new UploadResponseMessage("Username already exists"));
    }
}
