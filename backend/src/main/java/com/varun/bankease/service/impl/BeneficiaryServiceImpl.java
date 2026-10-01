package com.varun.bankease.service.impl;

import com.varun.bankease.dto.request.BeneficiaryRequest;
import com.varun.bankease.dto.response.BeneficiaryResponse;
import com.varun.bankease.entity.Beneficiary;
import com.varun.bankease.exception.ResourceNotFoundException;
import com.varun.bankease.mapper.BankEaseMapper;
import com.varun.bankease.repository.BeneficiaryRepository;
import com.varun.bankease.service.BeneficiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeneficiaryServiceImpl implements BeneficiaryService {
    private final BeneficiaryRepository repo;
    private final BaseService base;
    private final BankEaseMapper mapper;

    @Override
    public BeneficiaryResponse add(BeneficiaryRequest r) {
        Beneficiary b = Beneficiary.builder().name(r.getName()).accountNumber(r.getAccountNumber()).ifscCode(r.getIfscCode()).bankName(r.getBankName()).nickname(r.getNickname()).user(base.currentUser()).build();
        return mapper.toBeneficiary(repo.save(b));
    }

    @Override
    public List<BeneficiaryResponse> list() {
        return repo.findByUser(base.currentUser()).stream().map(mapper::toBeneficiary).toList();
    }

    @Override
    public void deactivate(Long id) {
        Beneficiary b = repo.findByIdAndUser(id, base.currentUser()).orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));
        b.setActive(false);
        repo.save(b);
    }
}
