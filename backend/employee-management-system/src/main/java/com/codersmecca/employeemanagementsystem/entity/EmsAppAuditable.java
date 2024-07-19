package com.codersmecca.employeemanagementsystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public abstract class EmsAppAuditable {

    @Column
    protected LocalDateTime createdTime;

    @Column
    protected LocalDateTime lastUpdatedTime;

    @PrePersist
    public void onPrePersist() {
        this.createdTime = LocalDateTime.now();
    }

    @PreUpdate
    public void onPreUpdate() {
        this.lastUpdatedTime = LocalDateTime.now();
    }
//    https://medium.com/thefreshwrites/jpa-auditing-spring-boot-spring-security-575c77867570
}
