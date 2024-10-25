package com.login.demo.controller;

import com.login.demo.dto.LinkUserDTO;
import com.login.demo.models.Link;
import com.login.demo.models.UserSec;
import com.login.demo.service.ILinkService;

import com.login.demo.service.IUserSecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/links")
@RestController
public class LinkController {
    @Autowired
    private ILinkService linkService;

    @Autowired
    private IUserSecService userSecService;

    @PostMapping("/new")
    public ResponseEntity<Link> createLink(@RequestBody LinkUserDTO linkUserDTO) {

        if (linkUserDTO.getId_user() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<UserSec> usuarioOpt = userSecService.findById(linkUserDTO.getId_user());

        if (usuarioOpt.isPresent()) {
            Link newLink = new Link();
            newLink.setLink(linkUserDTO.getLink());
            newLink.setPlatform(linkUserDTO.getPlatform());
            newLink.setUsuario(usuarioOpt.get());

            Link savedLink = linkService.save(newLink);
            return ResponseEntity.ok(savedLink);
        }
        else {
          return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    public String updateLink(@PathVariable Long id, @RequestBody LinkUserDTO linkUserDTO) {
        // Verificar si el enlace existe
        Optional<Link> existingLinkOpt = linkService.findById(id);

        if (!existingLinkOpt.isPresent()) {
            return "no hay link";
            // return ResponseEntity.notFound().build(); // Enlace no encontrado
        }

        Link existingLink = existingLinkOpt.get();

        existingLink.setLink(linkUserDTO.getLink());
        existingLink.setPlatform(linkUserDTO.getPlatform());

        Link updatedLink = linkService.save(existingLink);

        return "se creo el link";
        //return ResponseEntity.ok(updatedLink); // Devolver el enlace actualizado
    }



    @GetMapping()
    public ResponseEntity<List<Link>> findAllLinks(){
        List<Link> linkList = linkService.findAll();
        return ResponseEntity.ok(linkList);
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        linkService.deleteById(id);
        return ResponseEntity.noContent().build(); // Respuesta 204 No Content
    }

}

