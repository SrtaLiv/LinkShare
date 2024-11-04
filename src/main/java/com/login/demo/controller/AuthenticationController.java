package com.login.demo.controller;

import com.login.demo.dto.AuthLoginRequestDTO;
import com.login.demo.dto.AuthResponseDTO;
import com.login.demo.dto.RegisterUserDTO;
import com.login.demo.models.UserSec;
import com.login.demo.service.UserDetailsServiceImp;
import com.login.demo.utils.JwtUtils;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private JwtUtils jwtService;

    @Autowired
    private UserDetailsServiceImp userDetailsService;

    //Todas estas requests y responses vamos a tratarlas como dto
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid AuthLoginRequestDTO userRequest) {
        return new ResponseEntity<>(this.userDetailsService.loginUser(userRequest), HttpStatus.OK);
    }

}
