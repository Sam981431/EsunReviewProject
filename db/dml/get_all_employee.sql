DELIMITER //

CREATE PROCEDURE get_all_employee()
BEGIN
    SELECT * FROM employee;
END //

DELIMITER ;