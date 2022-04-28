package com.lukas.project_manager.service;

import com.lukas.project_manager.entities.ProjectImages;
import com.lukas.project_manager.exceptions.FileTypeException;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    @Value("${upload.path}")
    private String uploadPath;

    private final String[] allowedFileTypes = {"jpg", "jpeg", "png", "bmp"};

    @Override
    // saves the image files
    public void save(MultipartFile file) {
        try {
            checkFileType(file);

            Path root = Paths.get(uploadPath);

            Files.copy(file.getInputStream(), root.resolve(file.getOriginalFilename()));
        } catch (FileTypeException fileExc) {
            throw new FileTypeException();
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    // deletes the image files
    public void delete(List<ProjectImages> imagesList){
        imagesList.forEach(image -> {
            String imageFileName = image.getImageUrl().substring(image.getImageUrl().lastIndexOf('/'));
            Path fileToDelete = Paths.get(uploadPath + imageFileName);
            try {
                Files.delete(fileToDelete);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    // checks the file type and throws an exception if invalid type
    private void checkFileType(MultipartFile file) throws FileTypeException, IOException {
        List<String> fileList = new ArrayList<>(Arrays.asList(allowedFileTypes));

        Tika tika = new Tika();
        String mimeType = tika.detect(file.getInputStream());
        int index = mimeType.lastIndexOf('/');

        if (!(mimeType.contains("image") && fileList.contains(mimeType.substring(index + 1)))) {
            throw new FileTypeException();
        }
    }
}
