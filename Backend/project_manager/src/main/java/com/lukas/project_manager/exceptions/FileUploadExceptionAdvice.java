package com.lukas.project_manager.exceptions;

import com.lukas.project_manager.controller.UploadResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import static org.springframework.http.ResponseEntity.status;

@ControllerAdvice
public class FileUploadExceptionAdvice {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<UploadResponseMessage> uploadSizeLimitHandler() {
        return status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(new UploadResponseMessage("The file is too large!"));
    }
}
