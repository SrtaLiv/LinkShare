package com.login.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkDTO {
    private String link;
    private String platform;
    private Long userId; // Nuevo campo para el id del usuario

    public LinkDTO(String link, String platform, Long userId) {
        this.link = link;
        this.platform = platform;
        this.userId = userId;
    }

    public LinkDTO(String link, String platform) {
        this.link = link;
        this.platform = platform;
    }

    public LinkDTO() {}
}
