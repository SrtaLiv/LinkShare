package com.login.demo.controller;

import com.login.demo.dto.LinkDTO;
import com.login.demo.dto.LinkResponseDTO;
import com.login.demo.models.Link;
import com.login.demo.models.UserSec;
import com.login.demo.service.ILinkService;

import com.login.demo.service.IUserSecService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/links")
@RestController
public class LinkController {
    @Autowired
    private ILinkService linkService;

    @Autowired
    private IUserSecService userSecService;

    //CUALQUIERA PEUDE VER LOS LINKS DE UN USUARIO
    @GetMapping("/user/{username}")
    public ResponseEntity<List<LinkDTO>> findLinksByUsuario(@PathVariable String username){
       List<LinkDTO> linkList = linkService.findLinksByUsuario(username);
        return ResponseEntity.ok(linkList);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/{id}")
    public Optional<Link> getLinkById(@PathVariable Long id){
        Optional<Link> link = linkService.findById(id);
        return link;
    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<Link>> findAllLinks(){
        List<Link> linkList = linkService.findAll();
        return ResponseEntity.ok(linkList);
    }

    //debemos asociar cada link al usuario autenticado, como=?
    @PostMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<LinkResponseDTO> createLink(@Valid @RequestBody LinkDTO linkUserDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserSec> userOpt = userSecService.findByEmail(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        UserSec user = userOpt.get();
        Link newLink = new Link();
        newLink.setPlatform(linkUserDTO.getPlatform());
        newLink.setLink(linkUserDTO.getLink());
        newLink.setUsuario(user);

        Link savedLink = linkService.save(newLink);

        LinkResponseDTO responseDTO = new LinkResponseDTO(
                savedLink.getPlatform(),
                savedLink.getLink(),
                user.getUsername(),
                user.getEmail()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }


    @PreAuthorize("hasAnyRole('USER')")
    @PutMapping("/{id}")
    public ResponseEntity<Link> updateLink(@PathVariable Long id, @RequestBody LinkDTO linkDTO) {
        Optional<Link> existingLinkOpt = linkService.findById(id);

        if (existingLinkOpt.isEmpty()) {
             return ResponseEntity.notFound().build();
        }
        Link existingLink = existingLinkOpt.get();

        existingLink.setLink(linkDTO.getLink());
        existingLink.setPlatform(linkDTO.getPlatform());

        Link updatedLink = linkService.save(existingLink);

        return ResponseEntity.ok(updatedLink);
    }

    @PreAuthorize("hasAnyRole('USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        linkService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

