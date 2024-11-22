package com.login.demo.controller;

import com.login.demo.dto.LinkDTO;
import com.login.demo.models.Link;
import com.login.demo.models.UserSec;
import com.login.demo.service.ILinkService;

import com.login.demo.service.UserSecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/links")
@RestController
public class LinkController {
    @Autowired
    private ILinkService linkService;

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
    @PostMapping()
    public ResponseEntity<Link> createLink(@RequestBody LinkDTO linkDTO) {

        // Obtener el usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Link newLink = new Link();
        newLink.setLink(linkDTO.getLink());
        newLink.setPlatform(linkDTO.getPlatform());
     //   newLink.setUsuario(email);

        Link savedLink = linkService.save(newLink);

        //LinkDTO responseDto = new LinkDTO(savedLink.getLink(), savedLink.getPlatform(), 1);

        return  ResponseEntity.ok(linkService.save(newLink));
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        linkService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

