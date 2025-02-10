package com.login.demo.repository;

import com.login.demo.dto.LinkDTO;
import com.login.demo.models.Link;
import com.login.demo.models.UserSec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILinkRepository extends JpaRepository<Link, Long> {

    @Query("SELECT new com.login.demo.dto.LinkDTO(l.id, l.platform, l.link) FROM Link l WHERE l.usuario.username = :username")
    List<LinkDTO> findByUsuarioUsername(String username);
}