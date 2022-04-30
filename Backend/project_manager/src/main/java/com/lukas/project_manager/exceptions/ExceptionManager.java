package com.lukas.project_manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class ExceptionManager {

    // Handle username already exists
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity userAlreadyExistsHandler() {
        return ResponseEntity.badRequest().body("Username already exists");
    }

    // Handle too many files
    @ExceptionHandler(TooManyImagesException.class)
    public ResponseEntity tooManyImagesHandler() {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("You can't upload more than 6 images to a single project!");
    }

    // Handle files that are above file size limit
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity uploadSizeLimitHandler() {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body("The file is too large, maximum file size is 200KB");
    }

    // Handle incorrect file types
    @ExceptionHandler(FileTypeException.class)
    public ResponseEntity fileTypeHandler() {
        return ResponseEntity.badRequest().body("Incorrect file type. Please use: jpg, jpeg, png or bmp");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity generalException(Exception exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity badCredentialsHandler() {
        return ResponseEntity.badRequest().body("Username or password is incorrect, please try again");
    }
}
