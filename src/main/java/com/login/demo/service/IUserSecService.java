package com.login.demo.service;


import com.login.demo.models.UserSec;

import java.util.List;
import java.util.Optional;

public interface IUserSecService {

    public List<UserSec> findAll();
    public Optional<UserSec> findById(Long id);
    UserSec save(UserSec userSec);
    public void deleteById(Long id);
    public void update(UserSec userSec);
    public String encriptPassword(String password);

    Optional<UserSec> findByEmail(String email);
}
