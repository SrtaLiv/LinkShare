package com.login.demo.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterUserDTO (@NotBlank String email, @NotBlank String password) {


}
