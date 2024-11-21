package com.login.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthLoginRequestDTO (@NotBlank String email, @NotBlank String password) {
}

