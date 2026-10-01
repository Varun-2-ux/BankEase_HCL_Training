package com.varun.bankease.dto.response;

import com.varun.bankease.enums.KycStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private KycStatus kycStatus;
    private boolean enabled;
    private int failedLoginAttempts;
}
