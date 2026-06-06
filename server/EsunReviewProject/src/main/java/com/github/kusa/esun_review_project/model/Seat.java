package com.github.kusa.esun_review_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "seating_chart")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FLOOR_SEAT_SEQ")
    private Long seatSeq;

    @Column(name = "FLOOR_NO")
    private Long floorNo;

    @Column(name = "SEAT_NO")
    private Long seatNo;

    public Long getSeatSeq() {
        return seatSeq;
    }

    public Long getFloorNo() {
        return floorNo;
    }

    public Long getSeatNo() {
        return seatNo;
    }
}
