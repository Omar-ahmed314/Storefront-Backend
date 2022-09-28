CREATE TABLE user_table (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    password VARCHAR(100) NOT NULL
);