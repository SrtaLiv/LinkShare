package com.login.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkResponseDTO {
    private String platform;
    private String link;
    private String username;
    private String email;

    public LinkResponseDTO(String platform, String link, String username, String email) {
        this.platform = platform;
        this.link = link;
        this.username = username;
        this.email = email;

    }

    // Getters y setters
}
