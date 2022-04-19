package com.lukas.project_manager.service;

import com.lukas.project_manager.entities.User;

public interface UserService {

    User getUser(int userID);

    User saveUser(User user);
}
