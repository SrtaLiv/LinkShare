package com.login.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@PreAuthorize("denyAll()")
//@RequestMapping("/auth")
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

    @GetMapping("/auth/hello-secured")
    public String helloSecured() {
        return "Hello, Secured World!";
    }
}
