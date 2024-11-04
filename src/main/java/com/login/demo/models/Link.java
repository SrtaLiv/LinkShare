package com.login.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestMapping;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "links")
@RequestMapping("/api/links")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String link;
    private String platform;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UserSec usuario;

}
