package com.varun.bankease.service;

import com.varun.bankease.dto.request.BeneficiaryRequest;
import com.varun.bankease.dto.response.BeneficiaryResponse;

import java.util.List;

public interface BeneficiaryService {
    BeneficiaryResponse add(BeneficiaryRequest r);

    List<BeneficiaryResponse> list();

    void deactivate(Long id);
}