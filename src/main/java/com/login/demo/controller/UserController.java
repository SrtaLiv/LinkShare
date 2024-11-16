package com.login.demo.controller;

import com.login.demo.models.Permission;
import com.login.demo.models.Role;
import com.login.demo.models.UserSec;
import com.login.demo.service.IRoleService;
import com.login.demo.service.IUserSecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserSecService userService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserSec>> getAllUsers() {
        List<UserSec> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserSec> getUserById(@PathVariable Long id) {
        Optional<UserSec> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserSec> createUser(@RequestBody UserSec userSec) {

        //encriptacion de contra
        userSec.setPassword(userService.encriptPassword(userSec.getPassword()));

        //hardcodeo de userSec
        userSec.setEnabled(true);
        userSec.setAccountNotExpired(true);
        userSec.setAccountNotLocked(true);
        userSec.setCredentialNotExpired(true);

        // Crear rol "USER" con permisos predeterminados
        Role defaultRole = new Role();
        defaultRole.setRole("USER");

        // Configurar permisos predeterminados
        Permission readPermission = new Permission();
        readPermission.setPermissionName("READ");

        Permission writePermission = new Permission();
        writePermission.setPermissionName("WRITE");

        // Asignar permisos al rol
        Set<Permission> permissions = new HashSet<>();
        permissions.add(readPermission);
        permissions.add(writePermission);
        defaultRole.setPermissionsList(permissions);

        // Asignar el rol al usuario
        Set<Role> roles = new HashSet<>();
        roles.add(defaultRole);
        userSec.setRolesList(roles);


        UserSec newUser = userService.save(userSec);
        return ResponseEntity.ok(newUser);
    }


}