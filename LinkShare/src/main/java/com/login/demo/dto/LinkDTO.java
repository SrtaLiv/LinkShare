package com.login.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkDTO {
    @NotEmpty(message = "El enlace no puede estar vacío")
    private String link;

    @NotEmpty(message = "La plataforma no puede estar vacía")
    private String platform;

    public LinkDTO(String link, String platform, Long userId) {
        this.link = link;
        this.platform = platform;
    }

    public LinkDTO(String link, String platform) {
        this.link = link;
        this.platform = platform;
    }

    public LinkDTO() {}
}
