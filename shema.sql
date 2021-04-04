CREATE table users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BIT DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE table lists(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE comments(
    id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(255) NOT NULL,
    list_id INT,
    comment_by INT,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id),
    FOREIGN KEY (comment_by) REFERENCES users(id)
);

CREATE TABLE requests(
    id INT NOT NULL AUTO_INCREMENT,
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE list_restaurants(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating BIT,
    CONSTRAINT check_Rating CHECK (Rating >= 0 AND Ratings <= 5),
    list_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id)
);

INSERT INTO requests(endpoint, method) 
VALUES 
    ('API/v1/users', 'GET'),
    ('API/v1/comments', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/lists', 'POST'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET'),
    ('API/v1/comments', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/comments', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/lists', 'POST'),
    ('API/v1/lists', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET'),
    ('API/v1/users', 'GET'),
    ('API/v1/comments', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/lists', 'POST'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET'),
    ('API/v1/comments', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/comments', 'PUT'),
    ('API/v1/users', 'GET'),
    ('API/v1/lists', 'POST'),
    ('API/v1/lists', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET'),
    ('API/v1/users', 'POST'),
    ('API/v1/users', 'PUT'),
    ('API/v1/lists', 'GET')
;

INSERT INTO users(name, email, password, is_admin) VALUES ('Vladimir Kubliy', 'testemail', 'password', 1);