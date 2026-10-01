package com.varun.bankease.repository;

import com.varun.bankease.entity.AuditLog;
import com.varun.bankease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findTop100ByOrderByCreatedAtDesc();

    List<AuditLog> findTop100ByUserOrderByCreatedAtDesc(User user);
}