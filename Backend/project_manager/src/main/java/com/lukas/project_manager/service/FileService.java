package com.lukas.project_manager.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void save(MultipartFile file);
}
