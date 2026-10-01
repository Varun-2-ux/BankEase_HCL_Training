package com.varun.bankease.service;

import com.varun.bankease.dto.response.AdminUserResponse;
import com.varun.bankease.dto.response.UserResponse;
import com.varun.bankease.enums.KycStatus;

import java.util.List;

public interface AdminService {
    List<AdminUserResponse> users();

    UserResponse updateKyc(Long userId, KycStatus status);

    UserResponse setEnabled(Long userId, boolean enabled);
}