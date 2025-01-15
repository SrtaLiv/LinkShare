package com.login.demo.mail;

public interface IEmailService {
  //  void sendVerificationEmail(String to, String token); si pusiera esto tendria q pasar por parametros el user y otros
    void sendVerificationEmail(ConfirmationToken confirmationToken);
}
