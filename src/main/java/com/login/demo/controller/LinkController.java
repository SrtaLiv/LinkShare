package com.login.demo.controller;

import com.login.demo.dto.LinkDTO;
import com.login.demo.models.Link;
import com.login.demo.service.ILinkService;

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

    @GetMapping("/{id}")
    public Optional<Link> getLinkById(@PathVariable Long id){
        Optional<Link> link = linkService.findById(id);
        return link;
    }

    @GetMapping()
    public ResponseEntity<List<Link>> findAllLinks(){
        List<Link> linkList = linkService.findAll();
        return ResponseEntity.ok(linkList);
    }

    @PostMapping()
    public ResponseEntity<Link> createLink(@RequestBody LinkDTO linkDTO) {
            Link newLink = new Link();
            newLink.setLink(linkDTO.getLink());
            newLink.setPlatform(linkDTO.getPlatform());

            Link savedLink = linkService.save(newLink);
            return  ResponseEntity.ok(savedLink);
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

    @DeleteMapping()
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        linkService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

