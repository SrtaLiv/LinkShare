package com.login.demo.models;

import com.login.demo.mail.ConfirmationToken;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSec{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, length = 100, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    private boolean enabled;
    private boolean accountNotExpired;
    private boolean accountNotLocked;
    private boolean credentialNotExpired;

    @OneToOne(mappedBy = "userSec", cascade = CascadeType.ALL)
    private ConfirmationToken confirmationToken;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable (name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns=@JoinColumn(name = "role_id"))
    private Set<Role> rolesList = new HashSet<>();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Link> links = new ArrayList<>();


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;


    public UserSec(String email, String username,  String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

}