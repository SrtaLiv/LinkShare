package com.login.demo.mail;

import com.login.demo.models.UserSec;
import com.login.demo.service.UserSecService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

    @Autowired
    private  IConfirmationTokenRepository confirmationTokenReposiroty;

    @Autowired
    private UserSecService userService;

    public ConfirmationToken getToken(String token) {
        return confirmationTokenReposiroty.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));
    }

    public ConfirmationToken getTokenByEmail(String email) {
        return confirmationTokenReposiroty.findConfirmationTokenByUserSec_Email(email)
                .orElseThrow(() -> new IllegalStateException("Token not found"));
    }

    public ConfirmationToken generateToken(UserSec userEntity) {
        ConfirmationToken confirmationToken = ConfirmationToken.builder()
                .token(UUID.randomUUID().toString())
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .userSec(userEntity)
                .build();
        return confirmationTokenReposiroty.save(confirmationToken);
    }


    public void confirmToken (String token) {
        ConfirmationToken confirmationToken = getToken(token);
        if (confirmationToken.isVerified()) {
            throw new IllegalStateException("Email already verified");
        }
        if (confirmationToken.isExpired()) {
            throw new IllegalStateException("Token expired");
        }
        confirmationToken.setVerifiedAt(LocalDateTime.now());
        confirmationTokenReposiroty.save(confirmationToken);
        userService.enableUser(confirmationToken.getUserSec().getUsername()); //User enable a true si es valido
    }
}