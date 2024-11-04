package com.login.demo.service;


import com.login.demo.dto.AuthLoginRequestDTO;
import com.login.demo.dto.AuthResponseDTO;
import com.login.demo.dto.RegisterUserDTO;
import com.login.demo.models.Role;
import com.login.demo.models.UserSec;
import com.login.demo.repository.IUserRepository;
import com.login.demo.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
//authentication service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private IUserRepository userRepo;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {

        //tenemos User sec y necesitamos devolver UserDetails
        //tra el usuario de la bd
        UserSec userSec = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("El email " + email + "no fue encontrado"));

        if (userSec.getEmail() == null || userSec.getEmail().isEmpty() ||
                userSec.getPassword() == null || userSec.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Email o password no pueden ser nulos o vacíos");
        }

        //con GrantedAuthority Spring Security maneja permisos pq necesitamos la lista de permisos
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();


        //retornamos el usuario de Spring Security con los datos de nuestro UserSec
        return new User(userSec.getEmail(),
                userSec.getPassword(),
                userSec.isEnabled(),
                userSec.isAccountNotExpired(),
                userSec.isCredentialNotExpired(),
                userSec.isAccountNotLocked(),
                authorityList);
    }

    public AuthResponseDTO loginUser(AuthLoginRequestDTO authLoginRequest) {
        // Validate email and password are not null or empty
        String email = authLoginRequest.email();
        String password = authLoginRequest.password();

        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Email and password cannot be null or empty");
        }

        Authentication authentication = this.authenticate(email, password);
        // If successful, set authentication and generate token
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtUtils.createToken(authentication);
        return new AuthResponseDTO(email, "Login successful", accessToken, true);
    }


    public UserSec signup(RegisterUserDTO input) {

        String username = input.email();
        String password = input.password();

        RegisterUserDTO registerUserDto = new RegisterUserDTO(username, password);
        UserSec user = new UserSec();
        user.setUsername(username);
        user.setPassword(password);

        return userRepo.save(user);
    }


    public Authentication authenticate(String email, String password) {
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Email and password cannot be null or empty");
        }

        UserDetails userDetails = this.loadUserByEmail(email);

        // Verify password
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return new UsernamePasswordAuthenticationToken(email, userDetails.getPassword(), userDetails.getAuthorities());
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loadUserByEmail(username);
    }
}
