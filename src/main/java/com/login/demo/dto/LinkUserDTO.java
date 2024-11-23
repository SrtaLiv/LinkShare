package com.login.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkUserDTO {
    private String link;
    private String platform;

    public LinkUserDTO(String link, String platform, String username) {
        this.link = link;
        this.platform = platform;
    }
}