CREATE TABLE closet_items (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  color VARCHAR(50) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  occasion VARCHAR(100) NOT NULL,
  tags VARCHAR(355) NOT NULL,
  photos VARCHAR(2000)[]
);

ALTER TABLE closet_items ADD CONSTRAINT unique_combination UNIQUE (item, category, color, brand, occasion, tags);
