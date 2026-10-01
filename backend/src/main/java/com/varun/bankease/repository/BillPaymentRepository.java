package com.varun.bankease.repository;

import com.varun.bankease.entity.BillPayment;
import com.varun.bankease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillPaymentRepository extends JpaRepository<BillPayment, Long> {
    List<BillPayment> findTop50ByUserOrderByCreatedAtDesc(User user);
}