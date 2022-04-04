package com.lukas.project_manager.exceptions;

import com.lukas.project_manager.controller.UploadResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.ResponseEntity.status;

@ControllerAdvice
public class TooManyImagesExceptionAdvice {

    // Handle too many files
    @ExceptionHandler(TooManyImagesException.class)
    public ResponseEntity<UploadResponseMessage> tooManyImagesHandler() {
        return status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(new UploadResponseMessage("You can't upload more than 6 images to a single project!"));
    }
}
