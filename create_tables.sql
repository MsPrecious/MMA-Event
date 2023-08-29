CREATE TABLE fighter (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    wins INT,
    losses INT,
    knockouts INT,
    submissions INT,
    weight_class VARCHAR(50),
    nationality VARCHAR(100),
    team VARCHAR(255)
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    date DATE,
    location VARCHAR(255)
);

CREATE TABLE fight (
    id SERIAL PRIMARY KEY,
    fighter1_id INT REFERENCES fighter(id),
    fighter2_id INT REFERENCES fighter(id),
    event_id INT REFERENCES event(id)
    -- Other columns related to fight details
);

CREATE TABLE ranking (
    id SERIAL PRIMARY KEY,
    fighter_id INT REFERENCES fighter(id),
    weight_class VARCHAR(50),
    rank INT
);
