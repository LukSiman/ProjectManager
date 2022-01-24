package com.lukas.project_manager.controller;

import com.lukas.project_manager.service.FileServiceImpl;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("projects")
public class FileController {

    private final FileServiceImpl fileService;

    @Autowired
    public FileController(FileServiceImpl fileService) {
        this.fileService = fileService;
    }

    @PostMapping("upload")
    public ResponseEntity<UploadResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            fileService.save(file);

            return status(HttpStatus.OK)
                    .body(new UploadResponseMessage("Uploaded the file successfully: " + file.getOriginalFilename()));

            // TODO: Move stuff to exception handlers
        } catch (MaxUploadSizeExceededException max) {
            return status(HttpStatus.PAYLOAD_TOO_LARGE)
                    .body(new UploadResponseMessage("The file is too large: " + file.getOriginalFilename() + "!"));
        } catch (Exception e) {
            return status(HttpStatus.EXPECTATION_FAILED)
                    .body(new UploadResponseMessage("Could not upload the file: " + file.getOriginalFilename() + "!"));
        }
    }
}