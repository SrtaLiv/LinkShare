package com.login.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkDTO {
    private Long id;

    @NotEmpty(message = "El enlace no puede estar vacío")
    private String link;

    @NotEmpty(message = "La plataforma no puede estar vacía")
    private String platform;

    public LinkDTO(Long id, String link, String platform) {
        this.id = id;
        this.link = link;
        this.platform = platform;
    }

    public LinkDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
