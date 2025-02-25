CREATE TABLE IF NOT EXISTS materials (
                                         id SERIAL PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL UNIQUE
    );
