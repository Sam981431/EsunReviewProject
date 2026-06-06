package com.github.kusa.esun_review_project.repository;

import com.github.kusa.esun_review_project.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    @Procedure(procedureName = "get_all_seats")
    List<Seat> callGetAllSeats();
}