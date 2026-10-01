package com.varun.bankease.service;

import com.varun.bankease.dto.request.LoginRequest;
import com.varun.bankease.dto.request.RegisterRequest;
import com.varun.bankease.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}