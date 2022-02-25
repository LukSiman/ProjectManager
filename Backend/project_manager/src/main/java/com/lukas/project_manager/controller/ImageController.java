package com.lukas.project_manager.controller;

import com.lukas.project_manager.service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private final ImageServiceImpl imageService;

    @Autowired
    public ImageController(ImageServiceImpl imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/default")
    @ResponseBody
    public String getDefaultImage(){
        return imageService.defaultImage();
    }

    @DeleteMapping("/{imgID}")
    @ResponseBody
    public String deleteProjectImage(@PathVariable int imgID) {
        return imageService.deleteImage(imgID);
    }
}
