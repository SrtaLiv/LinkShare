package com.login.demo.repository;

import com.login.demo.models.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILinkRepository extends JpaRepository<Link, Long> {

    //bucar links por usuairo
    List<Link> findByUsuarioUsername(String username);
}
