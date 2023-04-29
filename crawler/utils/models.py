import hashlib


class Product:
    def __init__(self, id, name, extra_product_type, extra_strap_type, extra_gpu_type, extra_storage_type,
                 extra_color_type, extra_ram_type, extra_model_type, extra_screen_size, actual_price, old_price,
                 showcase_image, product_type, product_sub_type):
        self.id = id
        self.name = name
        self.extra_product_type = extra_product_type
        self.extra_strap_type = extra_strap_type
        self.extra_gpu_type = extra_gpu_type
        self.extra_storage_type = extra_storage_type
        self.extra_color_type = extra_color_type
        self.extra_ram_type = extra_ram_type
        self.extra_model_type = extra_model_type
        self.extra_screen_size = extra_screen_size
        self.actual_price = actual_price
        self.old_price = old_price
        self.showcase_image = showcase_image
        self.product_type = product_type
        self.product_sub_type = product_sub_type

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class ProductImage:
    def __init__(self, color, source, product_id):
        self.id = hashlib.md5(f"{product_id}_{source}".encode("utf-8")).hexdigest()
        self.color = color
        self.source = source
        self.product_id = product_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class ProductInfo:
    def __init__(self, product_desc, product_spec, product_detail, product_qna, product_id):
        self.id = hashlib.md5(f"{product_id}".encode("utf-8")).hexdigest()
        self.product_desc = product_desc
        self.product_spec = product_spec
        self.product_detail = product_detail
        self.product_qna = product_qna
        self.product_id = product_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class ProductRating:
    def __init__(self, person_name, review, num_stars, created, modified, product_id):
        self.id = hashlib.md5(f"{product_id}_{person_name}_{created}".encode("utf-8")).hexdigest()
        self.person_name = person_name
        self.review = review
        self.num_stars = num_stars
        self.created = created
        self.modified = modified
        self.product_id = product_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class Stocks:
    def __init__(self, quantity, product_id):
        self.id = hashlib.md5(product_id.encode("utf-8")).hexdigest()
        self.quantity = quantity
        self.product_id = product_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class Provinces:
    def __init__(self, province_name, district_name):
        self.id = hashlib.md5(f"{province_name}_{district_name}".encode("utf-8")).hexdigest()
        self.province_name = province_name
        self.district_name = district_name

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)


class ShopdunkShops:
    def __init__(self, name, province_id):
        self.id = hashlib.md5(f"{name}_{province_id}".encode("utf-8")).hexdigest()
        self.name = name
        self.province_id = province_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
