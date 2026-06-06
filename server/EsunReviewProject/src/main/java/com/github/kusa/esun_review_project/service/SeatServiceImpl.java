package com.github.kusa.esun_review_project.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.kusa.esun_review_project.dto.EmployeeSeatDTO;
import com.github.kusa.esun_review_project.model.Seat;
import com.github.kusa.esun_review_project.repository.EmployeeRepository;
import com.github.kusa.esun_review_project.repository.SeatRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;
    private final EmployeeRepository employeeRepository;
    private final ObjectMapper objectMapper;

    public SeatServiceImpl(ObjectMapper objectMapper, SeatRepository seatRepository, EmployeeRepository employeeRepository) {
        this.seatRepository = seatRepository;
        this.employeeRepository = employeeRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    @Transactional(readOnly = false)
    public List<Seat> getAllSeats() {
        return seatRepository.callGetAllSeats();
    }

    @Override
    @Transactional(readOnly = false)
    public Integer applySeatChange(List<EmployeeSeatDTO> dtos) throws JsonProcessingException {
        String json = objectMapper.writeValueAsString(dtos);
        return employeeRepository.callChangeEmployeeSeats(json);
    }
}
