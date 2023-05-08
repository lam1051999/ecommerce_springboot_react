CREATE DATABASE IF NOT EXISTS `shopdunk`;

CREATE TABLE IF NOT EXISTS `shopdunk`.`customers` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gender` enum('MALE','FEMALE') COLLATE utf8mb3_unicode_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `username` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb3_unicode_ci,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_USERNAME` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`orders` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `receive_type` enum('STORE','HOME') COLLATE utf8mb3_unicode_ci NOT NULL,
  `total_price` bigint NOT NULL DEFAULT '0',
  `is_extract_receipt` tinyint DEFAULT '0',
  `payment` enum('BANK','ONEPAY','PAYOO','KREDIVO') COLLATE utf8mb3_unicode_ci DEFAULT 'BANK',
  `orders_status` enum('PROCESSING','APPROVED','REJECTED') COLLATE utf8mb3_unicode_ci DEFAULT 'PROCESSING',
  `payment_status` enum('PROCESSING','PAID','CANCELED') COLLATE utf8mb3_unicode_ci DEFAULT 'PROCESSING',
  `ship_address_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ship_address_id` (`ship_address_id`),
  KEY `username` (`username`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ship_address_id`) REFERENCES `ship_addresses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`username`) REFERENCES `customers` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`product_images` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `source` text COLLATE utf8mb3_unicode_ci,
  `product_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`product_infos` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `product_desc` text COLLATE utf8mb3_unicode_ci,
  `product_spec` text COLLATE utf8mb3_unicode_ci,
  `product_detail` text COLLATE utf8mb3_unicode_ci,
  `product_qna` text COLLATE utf8mb3_unicode_ci,
  `product_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_infos_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`product_orders` (
  `quantity` int NOT NULL,
  `order_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `product_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`product_ratings` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `person_name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `review` text COLLATE utf8mb3_unicode_ci,
  `num_stars` tinyint unsigned NOT NULL DEFAULT '5',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`products` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_product_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_strap_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_gpu_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_storage_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_color_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_ram_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_model_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `extra_screen_size` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `actual_price` bigint DEFAULT NULL,
  `old_price` bigint DEFAULT NULL,
  `showcase_image` text COLLATE utf8mb3_unicode_ci,
  `product_type` enum('IPHONE','IPAD','MAC','WATCH','SOUND','ACCESSORY') COLLATE utf8mb3_unicode_ci NOT NULL,
  `product_sub_type` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `IDX_PRODUCT_TYPE` (`product_type`,`product_sub_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`provinces` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `province_name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `district_name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`ship_addresses` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `exact_address` text COLLATE utf8mb3_unicode_ci,
  `province_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `province_id` (`province_id`),
  KEY `username` (`username`),
  CONSTRAINT `ship_addresses_ibfk_2` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ship_addresses_ibfk_3` FOREIGN KEY (`username`) REFERENCES `customers` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`shopdunk_shops` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `province_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `shopdunk_shops_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

CREATE TABLE IF NOT EXISTS `shopdunk`.`stocks` (
  `id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `product_id` char(32) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;