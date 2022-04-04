package com.lukas.project_manager.controller;

import com.lukas.project_manager.exceptions.FileTypeException;
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
        fileService.save(file);

        return status(HttpStatus.OK)
                .body(new UploadResponseMessage("Uploaded the file successfully: " + file.getOriginalFilename()));
    }
}