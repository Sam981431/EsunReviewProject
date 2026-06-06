DELIMITER //

CREATE PROCEDURE insert_default_employee()
BEGIN
    START TRANSACTION;
        INSERT INTO employee (`EMP_ID`, `NAME`, `EMAIL`, `FLOOR_SEAT_SEQ`) 
        VALUES 
            (11221, 'EMPLOYEE1', '1@test.com', NULL),
            (12006, 'EMPLOYEE2', '2@test.com', NULL),
            (13040, 'EMPLOYEE3', '3@test.com', NULL),
            (16142, 'EMPLOYEE4', '4@test.com', NULL),
            (16722, 'EMPLOYEE5', '5@test.com', NULL),
            (17081, 'EMPLOYEE6', '6@test.com', NULL);
    COMMIT;
END //

DELIMITER ;