package com.varun.bankease.controller;

import com.varun.bankease.dto.request.FundTransferRequest;
import com.varun.bankease.dto.response.TransferResponse;
import com.varun.bankease.service.TransferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {
    private final TransferService service;

    @PostMapping
    public TransferResponse transfer(@Valid @RequestBody FundTransferRequest r) {
        return service.transfer(r);
    }

    @GetMapping
    public List<TransferResponse> history() {
        return service.history();
    }
}
