package com.login.demo.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUser {
    private String email;
    private String verificationCode;
}