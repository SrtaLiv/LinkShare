package com.login.demo.controller;

import com.login.demo.models.Link;
import com.login.demo.service.ILinkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class LinkController {
    @Autowired
    private ILinkService linkService;

    @PostMapping("/link")
    public ResponseEntity<Link> createLink(@RequestBody Link link) {
        Link newLink = linkService.save(link);
        return ResponseEntity.ok(newLink);
    }

    @GetMapping("/link")
    public ResponseEntity<List<Link>> findAllLinks(){
        List<Link> linkList = linkService.findAll();
        return ResponseEntity.ok(linkList);
    }

}

