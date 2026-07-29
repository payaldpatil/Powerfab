package com.powerfab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.powerfab.backend.entity.User;
import com.powerfab.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User u = repo.findByUsernameAndPassword(
                user.getUsername(),
                user.getPassword());

        if (u != null) {
            return ResponseEntity.ok("Login Success");
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Username or Password");
    }
}