package com.github.kusa.esun_review_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @Column(name = "EMP_ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "FLOOR_SEAT_SEQ")
    private Long seatSeq;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getSeatSeq() {
        return seatSeq;
    }

    public void setSeatSeq(Long seatSeq) {
        this.seatSeq = seatSeq;
    }
}
