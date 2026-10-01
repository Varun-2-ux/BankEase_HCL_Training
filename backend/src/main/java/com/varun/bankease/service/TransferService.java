package com.varun.bankease.service;

import com.varun.bankease.dto.request.FundTransferRequest;
import com.varun.bankease.dto.response.TransferResponse;

import java.util.List;

public interface TransferService {
    TransferResponse transfer(FundTransferRequest r);

    List<TransferResponse> history();
}