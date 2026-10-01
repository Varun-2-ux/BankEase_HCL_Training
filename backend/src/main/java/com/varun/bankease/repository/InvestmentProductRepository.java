package com.varun.bankease.repository;

import com.varun.bankease.entity.InvestmentProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentProductRepository extends JpaRepository<InvestmentProduct, Long> {
    List<InvestmentProduct> findByActiveTrue();
}