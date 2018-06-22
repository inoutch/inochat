DROP TABLE IF EXISTS chat_rooms;
DROP TABLE IF EXISTS chats;

CREATE TABLE users(
  id serial NOT NULL,
  username varchar(256) NOT NULL,
  password_hash varchar(60) NOT NULL,
  enable boolean NOT NULL,
  PRIMARY KEY (id)
) WITHOUT OIDS;

CREATE TABLE chat_rooms (
  id serial NOT NULL,
  user_id int NOT NULL,
  name varchar(256) NOT NULL,
  PRIMARY KEY (id)
) WITHOUT OIDS;

CREATE TABLE chats (
  id serial NOT NULL,
  user_id int NOT NULL,
  chat_room_id int NOT NULL,
  username varchar(256),
  message varchar(1024) NOT NULL,
  PRIMARY KEY (id)
) WITHOUT OIDS;

ALTER TABLE chats
      ADD FOREIGN KEY (chat_room_id)
      REFERENCES chat_rooms (id)
      ON UPDATE RESTRICT
      ON DELETE RESTRICT;

ALTER TABLE chats
      ADD FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON UPDATE RESTRICT
      ON DELETE RESTRICT;

ALTER TABLE chat_rooms
      ADD FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON UPDATE RESTRICT
      ON DELETE RESTRICT;