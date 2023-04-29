create database if not exists shopdunk;

create table if not exists `shopdunk`.`products` (
	`id` char(32) NOT NULL,
	`name` varchar(1000),
    `extra_product_type` varchar(255),
    `extra_strap_type` varchar(255),
    `extra_gpu_type` varchar(255),
    `extra_storage_type` varchar(255),
    `extra_color_type` varchar(255),
    `extra_ram_type` varchar(255),
    `extra_model_type` varchar(255),
    `extra_screen_size` varchar(255),
	`actual_price` bigint,
	`old_price` bigint,
	`showcase_image` text,
	`product_type` enum('IPHONE', 'IPAD', 'MAC', 'WATCH', 'SOUND', 'ACCESSORY') NOT NULL,
	`product_sub_type` varchar(255) NOT NULL,
	`created` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `IDX_PRODUCT_TYPE` (`product_type`, `product_sub_type`),
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`product_images` (
	`id` char(32) NOT NULL,
	`color` varchar(255),
	`source` text,
	`product_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`product_id`) REFERENCES `shopdunk`.`products`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`product_infos` (
	`id` char(32) NOT NULL,
	`product_desc` text,
	`product_spec` text,
	`product_detail` text,
	`product_qna` text,
	`product_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`product_id`) REFERENCES `shopdunk`.`products`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`product_ratings` (
	`id` char(32) NOT NULL,
	`person_name` varchar(1000),
	`review` text,
	`num_stars` tinyint unsigned NOT NULL DEFAULT 5,
	`created` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `product_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`product_id`) REFERENCES `shopdunk`.`products`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`stocks` (
	`id` char(32) NOT NULL,
	`quantity` INT NOT NULL DEFAULT 0,
	`created` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `product_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`product_id`) REFERENCES `shopdunk`.`products`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`provinces` (
	`id` char(32) NOT NULL,
	`province_name` varchar(1000),
	`district_name` varchar(1000),
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`shopdunk_shops` (
	`id` char(32) NOT NULL,
	`name` varchar(1000),
	`province_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`province_id`) REFERENCES `shopdunk`.`provinces`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`customers` (
	`id` char(32) NOT NULL,
	`name` varchar(1000),
	`gender` enum('MALE', 'FEMALE') NOT NULL,
	`dob` date,
	`phone_number` varchar(255),
	`email` varchar(255),
	`username` varchar(1000),
	`password` varchar(1000),
	`role` enum('USER', 'ADMIN') NOT NULL,
	`created` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	UNIQUE KEY `IDX_USERNAME` (`username`)
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`orders` (
	`id` char(32) NOT NULL,
	`created` datetime DEFAULT CURRENT_TIMESTAMP,
    `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `receive_type` enum('STORE', 'HOME') NOT NULL,
    `address` text,
    `total_price` bigint NOT NULL DEFAULT 0,
    `is_extract_receipt` tinyint DEFAULT '0',
    `payment` enum('BANK','ONEPAY','PAYOO','KREDIVO') COLLATE utf8mb3_unicode_ci DEFAULT 'BANK',
    `customer_id` char(32) NOT NULL,
    `province_id` char(32) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`customer_id`) REFERENCES `shopdunk`.`customers`(`id`) ON DELETE CASCADE,
	FOREIGN KEY (`province_id`) REFERENCES `shopdunk`.`provinces`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

create table if not exists `shopdunk`.`product_orders` (
	`quantity` INT NOT NULL,
    `order_id` char(32) NOT NULL,
    `product_id` char(32) NOT NULL,
	PRIMARY KEY (`order_id`, `product_id`),
	FOREIGN KEY (`order_id`) REFERENCES `shopdunk`.`orders`(`id`) ON DELETE CASCADE,
	FOREIGN KEY (`product_id`) REFERENCES `shopdunk`.`products`(`id`) ON DELETE CASCADE
)
ENGINE=InnoDB CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;