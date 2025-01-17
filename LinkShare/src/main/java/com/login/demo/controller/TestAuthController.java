package com.login.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("denyAll()")
@CrossOrigin(origins = "http://localhost:5173")
public class TestAuthController {

        @GetMapping("/sayhi")
        @PreAuthorize("permitAll()")
        public String sayHi(){
            return "Hi! This endpoint is not secured";
        }

        @GetMapping("/sayhisec")
        @PreAuthorize("hasAnyRole('USER')")
        public String sayHiSec(){
            return "Hi! This endpoint has been secured";
        }

    @GetMapping("/admins")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String secHelloWorld() {
        return "Hola SOLO ADMINS!";
    }

    @GetMapping("/holanoseg")
    @PreAuthorize("permitAll()")
    public String noSecHelloWorld() {
        return "Hola mundo";
    }

}
