package com.login.demo.service;

import com.login.demo.models.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImageService {
    Image uploadImagen(MultipartFile file) throws IOException;
    void deleteImagen(Image image) throws IOException;
}
