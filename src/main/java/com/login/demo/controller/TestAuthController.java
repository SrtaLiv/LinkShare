package com.login.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("denyAll()")
public class TestAuthController {

    @GetMapping("/auth/hello")
    @PreAuthorize("permitAll()")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/hello-secured2")
    @PreAuthorize("hasAuthority('CREATE')")
    public String helloSecured2() {
        return "Hello, Secured World2!";
    }

    @GetMapping("/auth/hello-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String helloSecured() {
        return "Hello, solo admins!";
    }
}
