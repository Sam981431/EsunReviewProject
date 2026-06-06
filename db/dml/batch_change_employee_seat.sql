DELIMITER //

CREATE PROCEDURE batch_change_employee_seat(
    IN p_json JSON,
    OUT status_code INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET status_code = 500;
    END;

    UPDATE employee e
    JOIN (
        SELECT *
        FROM JSON_TABLE(
            p_json,
            '$[*]'
            COLUMNS(
                employee_id INT PATH '$.employeeId',
                seat_id INT PATH '$.seatId'
            )
        ) jt
    ) t
    ON e.EMP_ID = t.employee_id
    SET e.FLOOR_SEAT_SEQ = t.seat_id;

    SET status_code = 200;
END //

DELIMITER ;