package com.login.demo.service;

import com.login.demo.models.Link;
import com.login.demo.models.UserSec;

import java.util.List;
import java.util.Optional;

public interface ILinkService {
    public List findAll();
    public Optional findById(Long id);
    public Link save(Link link);
    public void deleteById(Long id);
    public void update(Link link);

}
