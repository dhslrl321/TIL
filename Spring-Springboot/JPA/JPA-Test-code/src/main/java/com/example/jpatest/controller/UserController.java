package com.example.jpatest.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/index")
public class UserController {

    @PostMapping("/join")
    public String join(){
        return null;
    }

}
