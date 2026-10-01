package com.varun.bankease.repository;

import com.varun.bankease.entity.LoanApplication;
import com.varun.bankease.entity.User;
import com.varun.bankease.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByUserOrderByCreatedAtDesc(User user);

    List<LoanApplication> findByStatusOrderByCreatedAtAsc(LoanStatus status);

    Optional<LoanApplication> findByIdAndUser(Long id, User user);
}