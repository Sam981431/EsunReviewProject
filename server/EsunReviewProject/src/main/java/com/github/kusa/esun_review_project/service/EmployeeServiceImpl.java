package com.github.kusa.esun_review_project.service;

import com.github.kusa.esun_review_project.model.Employee;
import com.github.kusa.esun_review_project.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = false)
    public List<Employee> getAllEmployee() {
        return employeeRepository.callGetAllEmployee();
    }
}
