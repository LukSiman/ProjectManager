package com.lukas.project_manager.exceptions;

import com.lukas.project_manager.controller.UploadResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.ResponseEntity.status;

@ControllerAdvice
public class FileTypeExceptionAdvice {

    // Handle incorrect file types
    @ExceptionHandler(FileTypeException.class)
    public ResponseEntity<UploadResponseMessage> fileTypeHandler() {
        return status(HttpStatus.BAD_REQUEST)
                .body(new UploadResponseMessage("Incorrect file type. Please use: jpg, jpeg, png or bmp"));
    }
}
