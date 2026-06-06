package com.github.kusa.esun_review_project.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.kusa.esun_review_project.dto.EmployeeSeatDTO;
import com.github.kusa.esun_review_project.model.Seat;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SeatService {
    List<Seat> getAllSeats();

    Integer applySeatChange(List<EmployeeSeatDTO> payload) throws JsonProcessingException;
}
