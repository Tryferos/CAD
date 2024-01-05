package io.github.mixaniki.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

    @GetMapping("/")
    public ResponseEntity<HttpStatus> getIndex(){
        return new ResponseEntity("Hello World!",HttpStatus.OK);
    }

}
