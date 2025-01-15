package com.login.demo.service;


import com.login.demo.models.Permission;

import java.util.List;
import java.util.Optional;

public interface IPermissionService {

    List<Permission> findAll();
    Optional<Permission> findById(Long id);
    Permission save(Permission permission);
    void deleteById(Long id);
    Permission update(Permission permission);

}
