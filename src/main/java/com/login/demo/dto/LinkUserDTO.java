package com.login.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkUserDTO {
    private Long id_user;
    private String link;
    private String platform;

    public LinkUserDTO(Long id_user, String link, String platform) {
        this.id_user = id_user;
        this.link = link;
        this.platform = platform;
    }

    public LinkUserDTO() {}
}
