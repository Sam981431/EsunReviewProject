DELIMITER //

CREATE PROCEDURE get_all_seats()
BEGIN
    SELECT * FROM seating_chart;
END //

DELIMITER ;