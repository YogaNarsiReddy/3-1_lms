package com.lms.service.impl;

import com.lms.model.User;
import com.lms.repository.UserRepository;
import com.lms.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // Constructor injection (No Lombok required)
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        User u = userRepository.findByEmail(email);
        if (u == null) throw new RuntimeException("User not found");
        if (!u.getPassword().equals(password)) throw new RuntimeException("Invalid credentials");
        u.setPassword(null);
        return u;
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
