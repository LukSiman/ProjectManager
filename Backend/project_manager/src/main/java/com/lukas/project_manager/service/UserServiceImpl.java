package com.lukas.project_manager.service;

import com.lukas.project_manager.dao.UserRepository;
import com.lukas.project_manager.entities.User;
import com.lukas.project_manager.exceptions.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUser(int userID) {
        return userRepository.getById(userID);
    }

    @Override
    @Transactional
    public User saveUser(User user) {

        // throws exception if the username already exists
        if (userRepository.existsUserByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException();
        }

        return userRepository.save(user);
    }
}
