package com.login.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("denyAll()")
public class TestAuthController {

        @GetMapping("/sayhi")
        @PreAuthorize("permitAll()")
        public String sayHi(){
            return "Hi! This endpoint is not secured";
        }

        @GetMapping("/sayhisec")
        @PreAuthorize("isAuthenticated()")
        public String sayHiSec(){
            return "Hi! This endpoint has been secured";
        }
}
