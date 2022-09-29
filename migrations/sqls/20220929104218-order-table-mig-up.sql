CREATE TABLE order_table(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_table(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status BOOLEAN
);