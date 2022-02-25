package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService{

    private static final String DEFAULT_IMAGE = "assets/images/projects/default.png";

    @Autowired
    private final ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public String deleteImage(int imgID) {
        String projectImageName = imageRepository.getById(imgID).getImageUrl();
        imageRepository.deleteById(imgID);

        return projectImageName + " has been deleted";
    }

    @Override
    public String defaultImage() {
        return DEFAULT_IMAGE;
    }
}
