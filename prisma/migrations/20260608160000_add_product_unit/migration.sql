ALTER TABLE `products`
  ADD COLUMN `unit` ENUM('UN', 'CX', 'PC', 'KG', 'G', 'TON', 'L', 'ML', 'M', 'CM', 'M2', 'M3', 'SC', 'FD') NOT NULL DEFAULT 'UN';
