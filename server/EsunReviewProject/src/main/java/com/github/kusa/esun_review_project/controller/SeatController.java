package com.github.kusa.esun_review_project.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.github.kusa.esun_review_project.dto.EmployeeSeatDTO;
import com.github.kusa.esun_review_project.model.Seat;
import com.github.kusa.esun_review_project.service.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService){
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applySeatChange(@RequestBody List<EmployeeSeatDTO> payload) throws JsonProcessingException {
        Integer status = seatService.applySeatChange(payload);

        if (status == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
