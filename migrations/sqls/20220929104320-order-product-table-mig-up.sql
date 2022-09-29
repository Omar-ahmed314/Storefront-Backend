CREATE TABLE order_product_table (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT order_product_table_pk
    PRIMARY KEY (order_id, product_id),

    CONSTRAINT product_id_fk
    FOREIGN KEY (product_id)
    REFERENCES product_table(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT order_id_fk
    FOREIGN KEY (order_id)
    REFERENCES order_table(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);