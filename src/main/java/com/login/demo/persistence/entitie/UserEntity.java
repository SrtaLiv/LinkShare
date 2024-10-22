package com.login.demo.persistence.entitie;

import jakarta.persistence.*;
import lombok.*;

/*
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true)
    String username;
    String password;

    @Column(name = "is_enabled")
    boolean isEnabled;

    @Column(name = "account_No_Expired")
    boolean accountNotExpired;

    @Column(name = "account_No_Locked")
    boolean accountNoLocked;

    @Column(name = "credential_No_Locked")
    boolean credentialNoExpired;
}
*/