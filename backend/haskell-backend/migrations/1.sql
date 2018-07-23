CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  text TEXT,
  "when" BOOLEAN,
  what BOOLEAN,
  why BOOLEAN,
  how BOOLEAN
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  name TEXT
);

CREATE TABLE ideas_tags (
  idea_id INTEGER REFERENCES ideas (id),
  tag_id INTEGER REFERENCES tags (id)
);
