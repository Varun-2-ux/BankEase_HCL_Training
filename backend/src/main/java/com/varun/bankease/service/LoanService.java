package com.varun.bankease.service;

import com.varun.bankease.dto.request.LoanApplicationRequest;
import com.varun.bankease.dto.request.LoanDecisionRequest;
import com.varun.bankease.dto.response.LoanResponse;

import java.util.List;

public interface LoanService {
    LoanResponse apply(LoanApplicationRequest r);

    List<LoanResponse> myLoans();

    List<LoanResponse> pending();

    LoanResponse decide(Long id, LoanDecisionRequest r);
}