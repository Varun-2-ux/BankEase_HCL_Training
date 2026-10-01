package com.varun.bankease.service;

import com.varun.bankease.dto.request.BillPaymentRequest;
import com.varun.bankease.dto.response.BillPaymentResponse;

import java.util.List;

public interface BillPaymentService {
    BillPaymentResponse pay(BillPaymentRequest r);

    List<BillPaymentResponse> history();
}