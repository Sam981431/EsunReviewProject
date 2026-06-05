DELIMITER //

CREATE PROCEDURE InsertDefaultSeats()
BEGIN
    DECLARE floor_idx INT DEFAULT 1;
    DECLARE seat_idx INT DEFAULT 1;
    START TRANSACTION;
        WHILE floor_idx <= 4 DO
            SET seat_idx = 1;
            WHILE seat_idx <= 4 DO
                INSERT INTO seating_chart (`FLOOR_NO`, `SEAT_NO`) VALUES (floor_idx, seat_idx);
                SET seat_idx = seat_idx + 1;
            END WHILE;
            SET floor_idx = floor_idx + 1;
        END WHILE;
    COMMIT;
END //

DELIMITER ;