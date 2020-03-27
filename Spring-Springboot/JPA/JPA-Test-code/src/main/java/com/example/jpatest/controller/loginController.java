package com.example.jpatest.controller;

import com.example.jpatest.model.entity.User;
import com.example.jpatest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class loginController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

}
