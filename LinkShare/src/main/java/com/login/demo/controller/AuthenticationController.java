package com.login.demo.controller;

import com.login.demo.dto.AuthLoginRequestDTO;
import com.login.demo.dto.RegisterUserDto;
import com.login.demo.mail.ConfirmationTokenService;
import com.login.demo.service.UserDetailsServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserDetailsServiceImp userDetailsService;

    @Autowired
    private ConfirmationTokenService confirmationToken;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthLoginRequestDTO userRequest) {
        return new ResponseEntity<>(this.userDetailsService.loginUser(userRequest), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody @Valid RegisterUserDto userRequest) {
        return new ResponseEntity<>(this.userDetailsService.signupUser(userRequest), HttpStatus.OK);
    }

    @GetMapping("/confirm")
    public ResponseEntity<Object> confirm(@RequestParam("token") String token) {
        try {
            confirmationToken.confirmToken(token);
            return ResponseEntity.ok("Gracias, tu cuenta ha sido verificada.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}