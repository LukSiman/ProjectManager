package com.lukas.project_manager.controller;

import com.lukas.project_manager.exceptions.TooManyImagesException;
import com.lukas.project_manager.service.FileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.ResponseEntity.status;

@CrossOrigin
@RestController
@RequestMapping("projects")
public class FileController {

    @Value("${maximum.images}")
    private int max_images;

    private final FileServiceImpl fileService;

    @Autowired
    public FileController(FileServiceImpl fileService) {
        this.fileService = fileService;
    }

    @PostMapping("upload")
    public ResponseEntity<UploadResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("count") int count) {

        // checks if image count does not exceed the allowed limit
        if(count >= max_images){
            throw new TooManyImagesException();
        }

        fileService.save(file);

        return status(HttpStatus.OK)
                .body(new UploadResponseMessage("Uploaded the file successfully: " + file.getOriginalFilename()));
    }
}