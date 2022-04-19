package com.lukas.project_manager.controller;

import com.lukas.project_manager.dto.ProjectDTO;
import com.lukas.project_manager.dto.UserDTO;
import com.lukas.project_manager.entities.Project;
import com.lukas.project_manager.entities.User;
import com.lukas.project_manager.service.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private final UserServiceImpl userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/{userID}")
    @ResponseBody
    public ResponseEntity<UserDTO> getUser(@PathVariable int userID) {

        User user = userService.getUser(userID);

        // convert entity to DTO
        UserDTO userResponse = modelMapper.map(user, UserDTO.class);

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {

        // convert DTO to entity
        User userRequest = modelMapper.map(userDTO, User.class);

        User user = userService.saveUser(userRequest);


        // convert entity to DTO
        UserDTO userResponse = modelMapper.map(user, UserDTO.class);

        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }
}
