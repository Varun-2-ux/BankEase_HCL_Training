package com.varun.bankease.service;

import com.varun.bankease.dto.request.CreateAccountRequest;
import com.varun.bankease.dto.response.AccountResponse;

import java.util.List;

public interface AccountService {
    AccountResponse create(CreateAccountRequest request);

    List<AccountResponse> myAccounts();

    AccountResponse get(Long id);
}