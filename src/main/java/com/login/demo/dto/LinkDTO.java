package com.login.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkDTO {
    private String link;
    private String platform;

    public LinkDTO(String link, String platform) {
        this.link = link;
        this.platform = platform;
    }

    public LinkDTO() {}
}
