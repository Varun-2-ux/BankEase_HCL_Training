package com.varun.bankease.service.impl;

import com.varun.bankease.dto.response.AdminUserResponse;
import com.varun.bankease.dto.response.UserResponse;
import com.varun.bankease.entity.User;
import com.varun.bankease.enums.KycStatus;
import com.varun.bankease.exception.ResourceNotFoundException;
import com.varun.bankease.mapper.BankEaseMapper;
import com.varun.bankease.repository.UserRepository;
import com.varun.bankease.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final UserRepository repo;
    private final BankEaseMapper mapper;

    @Override
    public List<AdminUserResponse> users() {
        return repo.findAll().stream().map(u -> AdminUserResponse.builder().id(u.getId()).name(u.getFirstName() + " " + u.getLastName()).email(u.getEmail()).role(u.getRole().getName().name()).kycStatus(u.getKycStatus()).enabled(u.isEnabled()).failedLoginAttempts(u.getFailedLoginAttempts()).build()).toList();
    }

    @Override
    @Transactional
    public UserResponse updateKyc(Long id, KycStatus status) {
        User u = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        u.setKycStatus(status);
        return mapper.toUser(repo.save(u));
    }

    @Override
    @Transactional
    public UserResponse setEnabled(Long id, boolean enabled) {
        User u = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        u.setEnabled(enabled);
        return mapper.toUser(repo.save(u));
    }
}
