package com.lms.service;

import com.lms.model.User;

public interface UserService {
    User register(User user);
    User login(String email, String password);
    User getById(Long id);
}
