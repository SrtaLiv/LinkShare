package com.login.demo.service;

import com.login.demo.repository.ImageRepository;
import com.login.demo.models.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService implements IImageService{
    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;

    public ImageService(CloudinaryService cloudinaryService, ImageRepository imageRepository) {
        this.cloudinaryService = cloudinaryService;
        this.imageRepository = imageRepository;
    }

    @Override
    public Image uploadImagen(MultipartFile file) throws IOException {
        Map uploadResult = cloudinaryService.upload(file);
        String imageUrl = (String) uploadResult.get("url");
        String imageId = (String) uploadResult.get("public_id");
        Image image = new Image(file.getOriginalFilename(), imageUrl, imageId);
        return imageRepository.save(image);
    }

    @Override
    public void deleteImagen(Image image) throws IOException {
        cloudinaryService.delete(image.getImageId());
        imageRepository.deleteById(image.getId());
    }
}
