CREATE TABLE orders_table (
    id SERIAL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    user_id INT NOT NULL,
    status BOOLEAN,
    CONSTRAINT orders_table_pk
    PRIMARY KEY (id, product_id, user_id),

    CONSTRAINT product_id_fk
    FOREIGN KEY (product_id)
    REFERENCES product_table(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_table(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);