package com.varun.bankease.service;

import com.varun.bankease.dto.request.InvestmentRequest;
import com.varun.bankease.dto.response.InvestmentProductResponse;
import com.varun.bankease.dto.response.InvestmentResponse;

import java.util.List;

public interface InvestmentService {
    List<InvestmentProductResponse> products();

    InvestmentResponse invest(InvestmentRequest r);

    List<InvestmentResponse> myInvestments();

    InvestmentResponse redeem(Long id);
}