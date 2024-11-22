package com.login.demo.service;

import com.login.demo.models.Link;
import com.login.demo.repository.ILinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LinkService implements ILinkService {
    @Autowired
    private ILinkRepository linkRepository;

    @Override

    public List<Link> findAll() {
        return linkRepository.findAll();
    }

    @Override
    public Optional<Link> findById(Long id) {
        return linkRepository.findById(id);
    }

    @Override
    public Link save(Link link) {
        return linkRepository.save(link);
    }

    @Override
    public void deleteById(Long id) {
        linkRepository.deleteById(id);
    }

    @Override
    public void update(Link link) {
        linkRepository.save(link);
    }

/*
    @Override
    public List<Link> findLinksByUsuario(String username) {
        return linkRepository.findLinksByUsuario(username);
    }
*/
}
