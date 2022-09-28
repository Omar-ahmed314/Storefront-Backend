CREATE TABLE product_table (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    category INT
);