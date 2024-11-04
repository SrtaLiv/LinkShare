package com.login.demo.service;

import com.login.demo.dto.LinkDTO;
import com.login.demo.models.Link;

import java.util.List;
import java.util.Optional;

public interface ILinkService {
    List<Link> findAll();
    Optional<Link> findById(Long id);
    Link save(Link link);
    void deleteById(Long id);
    void update(Link link);

}
