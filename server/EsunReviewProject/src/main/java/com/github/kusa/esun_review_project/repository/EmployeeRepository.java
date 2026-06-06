package com.github.kusa.esun_review_project.repository;

import com.github.kusa.esun_review_project.dto.EmployeeSeatDTO;
import com.github.kusa.esun_review_project.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Procedure(procedureName = "get_all_employee")
    public List<Employee> callGetAllEmployee();

    @Procedure(procedureName = "batch_change_employee_seat", outputParameterName = "status_code")
    public Integer callChangeEmployeeSeats(@Param("p_json") String json);
}
