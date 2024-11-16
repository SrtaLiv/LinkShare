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
    @Autowired
    private UserSecService userService;


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

   /* @PostMapping()
    public ResponseEntity<LinkDTO> createLink(@RequestBody LinkDTO linkDTO) {

        // Obtener el usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        // Obtener el usuario de la base de datos usando email
        UserSec user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado")); // Manejo de error si no se encuentra el usuario

        Link newLink = new Link();
        newLink.setLink(linkDTO.getLink());
        newLink.setPlatform(linkDTO.getPlatform());
        newLink.setUsuario(user);

        Link savedLink = linkService.save(newLink);

        LinkDTO responseDto = new LinkDTO(savedLink.getLink(), savedLink.getPlatform(), user.getId());

        return  ResponseEntity.ok(responseDto);
    }*/

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

