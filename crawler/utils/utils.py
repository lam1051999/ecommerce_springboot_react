import time
import random
import hashlib
import datetime
import requests
import os

from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.remote.webdriver import WebElement
from faker import Faker
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import *
from selenium.webdriver.common.keys import Keys

from utils.url import IPHONE_URL_SUB_TYPE, IPAD_URL_SUB_TYPE, MAC_URL_SUB_TYPE, SOUND_URL_SUB_TYPE, WATCH_URL_SUB_TYPE, \
    ACCESSORY_URL_SUB_TYPE
from utils.models import Product, ProductInfo, ProductImage, ProductRating

EXTRA_TYPES = {
    "extra_product_type": ['Loại Sản Phẩm', 'Chọn loại'],
    "extra_strap_type": ['Loại dây'],
    "extra_gpu_type": ['GPU'],
    "extra_storage_type": ['Dung Lượng', 'Dung lượng', 'Storage_PP', 'nhắc văn bản'],
    "extra_color_type": ['Chọn màu =', 'Chọn màu', 'Chọn màu', 'Combo màu', 'Màu sắc'],
    "extra_ram_type": ['RAM'],
    "extra_model_type": ['Model'],
    "extra_screen_size": ['Kích cỡ', 'Màn hình']
}

PRODUCT_CHOICES = {
    "IPHONE": IPHONE_URL_SUB_TYPE,
    "IPAD": IPAD_URL_SUB_TYPE,
    "MAC": MAC_URL_SUB_TYPE,
    "WATCH": WATCH_URL_SUB_TYPE,
    "SOUND": SOUND_URL_SUB_TYPE,
    "ACCESSORY": ACCESSORY_URL_SUB_TYPE
}

DEFAULT_PRODUCT_COLOR = "rgba(255, 255, 255, 1)"

DEFAULT_START_DATE = datetime.datetime(2020, 1, 1, 0, 0, 0)


def clean_product_price(price):
    return int(price.replace("₫", "").replace(".", "").strip()) if price is not None and price.replace("₫", "").replace(
        ".", "").strip() != "" else None


def get_exists_css_selector(driver: WebDriver, selector, is_multiple=False):
    item = [] if is_multiple else None
    try:
        item = driver.find_elements(
            By.CSS_SELECTOR, selector) if is_multiple else driver.find_element(By.CSS_SELECTOR, selector)
    except NoSuchElementException:
        return [] if is_multiple else None
    except StaleElementReferenceException:
        print(f"Exception for selector: {selector}")
        raise Exception("Error happen")
    return item


def get_exists_child_element(element: WebElement, selector, is_multiple=False):
    item = [] if is_multiple else None
    try:
        item = element.find_elements(
            By.CSS_SELECTOR, selector) if is_multiple else element.find_element(By.CSS_SELECTOR, selector)
    except NoSuchElementException:
        return [] if is_multiple else None
    except StaleElementReferenceException:
        print(f"Exception for selector: {selector}")
        raise Exception("Error happen")
    return item


def get_exists_next_sibling(element: WebElement, tag_type: str):
    if element:
        try:
            return element.find_element(By.XPATH, f"./following-sibling::{tag_type}")
        except NoSuchElementException:
            return None
    else:
        return None


def get_element_text(element: WebElement):
    return element.text.strip() if element is not None else None


def get_element_innerHTML(element: WebElement):
    return element.get_attribute("innerHTML").strip() if element is not None else None


def is_has_child(element: WebElement, child_key: str):
    return child_key.lower() in [c.tag_name for c in get_exists_child_element(element, "*", True)]


def get_product_specific_data(driver: WebDriver):
    actual_price = clean_product_price(
        get_element_text(get_exists_css_selector(driver, "div.prices > div.product-price > span", False)))
    old_price = clean_product_price(
        get_element_text(get_exists_css_selector(driver, "div.prices > div.old-product-price > span", False)))
    return actual_price, old_price


def get_product_images(driver: WebDriver):
    return [e.get_attribute("src") for e in get_exists_css_selector(driver,
                                                                    "div.slick.slideshow > div.slick-list > div.slick-track > div.slick-slide > div > div > img",
                                                                    True)]


def get_showcase_image(driver: WebDriver):
    picture = get_exists_css_selector(driver, "div.gallery_sticky > div.gallery > div.picture > a > img", False)
    if picture:
        return picture.get_attribute("src")
    return None


def get_product_title(driver: WebDriver):
    return get_element_text(get_exists_css_selector(driver,
                                                    "#product-details-form > div:nth-child(2) > div.product-essential > div:nth-child(4) > div.wrapper-info > div.product-name > h1 > span.main-name",
                                                    False))


def get_product_description(driver: WebDriver):
    scroll_to_top_then_wait(driver, 1)
    product_info_map = {
        "Mô tả sản phẩm": None,
        "Thông số kỹ thuật": None,
        "Chi tiết sản phẩm": None,
        "Hỏi đáp": None
    }
    content_parent_id_map = {
        "Mô tả sản phẩm": "#pills-tabContent > #pills-home > div.full-description.container",
        "Thông số kỹ thuật": "#pills-tabContent > #pills-profile > div.product-specs-box > div.table-wrapper",
        "Chi tiết sản phẩm": None,
        "Hỏi đáp": None
    }
    info_tabs = get_exists_css_selector(driver, "#pills-tab > li > a", True)
    for info_tab in info_tabs:
        click_by_action(driver, info_tab)
        time.sleep(1)
        info_tab_text = get_element_text(info_tab)
        if info_tab_text and info_tab_text in product_info_map:
            if content_parent_id_map[info_tab_text]:
                info_tab_content = get_exists_css_selector(driver, content_parent_id_map[info_tab_text], False)
                product_info_map[info_tab_text] = get_element_innerHTML(info_tab_content)
            else:
                product_info_map[info_tab_text] = None
    return product_info_map


def get_product_colors_images_map(driver: WebDriver, colors_dd: WebElement):
    scroll_to_top_then_wait(driver, 1)
    colors_images_map = {}
    if colors_dd:
        color_elements = [e for e in
                          get_exists_child_element(colors_dd, "ul.option-list.color-squares.darkcontrols > li", True)]
        for color_element in color_elements:
            click_by_action(driver, color_element)
            time.sleep(1)
            product_color_ele = get_exists_child_element(color_element, "label > span > span", False)
            product_images = get_product_images(driver)
            if product_color_ele:
                product_color = product_color_ele.value_of_css_property("background-color")
                colors_images_map[product_color] = product_images
            else:
                colors_images_map[DEFAULT_PRODUCT_COLOR] = product_images
    else:
        product_images = get_product_images(driver)
        colors_images_map[DEFAULT_PRODUCT_COLOR] = product_images
    return colors_images_map


def get_product_common_data(driver: WebDriver, colors_dd: WebElement, link):
    title = get_product_title(driver)
    list_fake_reviews = generate_fake_reviews(link)
    colors_images_map = get_product_colors_images_map(driver, colors_dd)
    product_info_map = get_product_description(driver)
    return {
        "title": title,
        "colors_images_map": colors_images_map,
        "product_info_map": product_info_map,
        "list_fake_reviews": list_fake_reviews
    }


def generate_fake_reviews(link):
    fake = Faker()
    num_rating = random.randint(0, 20)
    list_fake_reviews = []
    for i in range(num_rating):
        person_name = fake.name()
        review = fake.text()
        num_stars = random.randint(1, 5)
        created = datetime.datetime.strftime(fake.date_time_between(start_date=DEFAULT_START_DATE), "%Y-%m-%d %H:%M:%S")
        list_fake_reviews.append({
            "person_name": person_name,
            "review": review,
            "num_stars": num_stars,
            "created": created,
            "modified": created
        })
    return list_fake_reviews


def get_final_data(product_common_data, storage_value, actual_price, old_price, link):
    final_data = product_common_data.copy()
    final_data["id"] = hashlib.md5(f"{link}_{storage_value}".encode("utf-8")).hexdigest()
    final_data["storage_value"] = storage_value
    final_data["actual_price"] = actual_price
    final_data["old_price"] = old_price
    return final_data


def click_by_action(driver: WebDriver, element: WebElement):
    action = ActionChains(driver)
    action.move_to_element(element).click().perform()


def get_products_objects(list_products, product_type):
    set_products = set()
    for product in list_products:
        set_products.add(Product(id=product["id"],
                                 name=product["title"],
                                 extra_product_type=product["extra_product_type"],
                                 extra_strap_type=product["extra_strap_type"],
                                 extra_gpu_type=product["extra_gpu_type"],
                                 extra_storage_type=product["extra_storage_type"],
                                 extra_color_type=product["extra_color_type"],
                                 extra_ram_type=product["extra_ram_type"],
                                 extra_model_type=product["extra_model_type"],
                                 extra_screen_size=product["extra_screen_size"],
                                 actual_price=product["actual_price"],
                                 old_price=product["old_price"],
                                 showcase_image=product["showcase_image"],
                                 product_type=product_type,
                                 product_sub_type=product["product_sub_type"]))
    return set_products


def get_product_images_objects(list_products):
    set_product_images = set()
    for product in list_products:
        for (key, val) in product["colors_images_map"].items():
            for source in val:
                set_product_images.add(ProductImage(color=key,
                                                    source=source,
                                                    product_id=product["id"]))
    return set_product_images


def get_product_infos_objects(list_products):
    set_product_infos_objects = set()
    for product in list_products:
        info_map = product["product_info_map"]
        set_product_infos_objects.add(
            ProductInfo(product_desc=info_map["Mô tả sản phẩm"],
                        product_spec=info_map["Thông số kỹ thuật"],
                        product_detail=info_map["Chi tiết sản phẩm"],
                        product_qna=info_map["Hỏi đáp"],
                        product_id=product["id"]))
    return set_product_infos_objects


def get_product_rating_objects(list_products):
    set_product_rating_objects = set()
    for product in list_products:
        for fake_review in product["list_fake_reviews"]:
            set_product_rating_objects.add(
                ProductRating(person_name=fake_review["person_name"],
                              review=fake_review["review"],
                              num_stars=fake_review["num_stars"],
                              created=fake_review["created"],
                              modified=fake_review["modified"],
                              product_id=product["id"]))
    return set_product_rating_objects


def fluent_wait_for_element_clickable(driver: WebDriver, target_element: WebElement, timeout: int) -> WebElement:
    wait = WebDriverWait(driver=driver,
                         timeout=timeout,
                         poll_frequency=1,
                         ignored_exceptions=[ElementNotVisibleException, ElementNotSelectableException])
    element = wait.until(EC.element_to_be_clickable(target_element))
    return element


def fluent_wait_for_element_present(driver: WebDriver, selector: str, timeout: int):
    wait = WebDriverWait(driver=driver,
                         timeout=timeout,
                         poll_frequency=1,
                         ignored_exceptions=[ElementNotVisibleException, NoSuchElementException])
    element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, selector)))
    return element


def get_key_extra_type_that_have_label(label):
    for (key, val) in EXTRA_TYPES.items():
        if label in val:
            return key
    return None


def get_product_common_data_remake(driver: WebDriver, link):
    title = get_product_title(driver)
    list_fake_reviews = generate_fake_reviews(link)
    product_info_map = get_product_description(driver)
    showcase_image = get_showcase_image(driver)
    return {
        "title": title,
        "product_info_map": product_info_map,
        "list_fake_reviews": list_fake_reviews,
        "showcase_image": showcase_image,
    }


def produce_none_value_extra_type(product_common_data):
    new_product_common_data = product_common_data.copy()
    for key in EXTRA_TYPES:
        new_product_common_data[key] = None
    return new_product_common_data


def get_not_color_dts(dts: list[WebElement]):
    return [dt for dt in dts if get_key_extra_type_that_have_label(
        get_element_text(get_exists_child_element(dt, "label"))) != "extra_color_type"]


def get_color_dt(dts: list[WebElement]):
    color_dts = [dt for dt in dts if get_key_extra_type_that_have_label(
        get_element_text(get_exists_child_element(dt, "label"))) == "extra_color_type"]
    return color_dts[-1] if len(color_dts) != 0 else None


def is_only_one_option_page(dts: list[WebElement]):
    not_color_dds = [get_exists_next_sibling(dt, "dd") for dt in get_not_color_dts(dts)]
    if len(not_color_dds) == 0:
        return True
    else:
        return is_has_child(not_color_dds[0], "a")


def get_final_data_remake(product_common_data, actual_price, old_price, colors_images_map, link, product_sub_type):
    final_data = product_common_data.copy()
    extra_type_values = [str(final_data[key]) for key in EXTRA_TYPES]
    extra_type_str = "_".join(extra_type_values)
    final_data["id"] = hashlib.md5(f"{link}_{extra_type_str}".encode("utf-8")).hexdigest()
    final_data["actual_price"] = actual_price
    final_data["old_price"] = old_price
    final_data["colors_images_map"] = colors_images_map
    final_data["product_sub_type"] = product_sub_type
    return final_data


def get_other_elements_in_list(elements: list[WebElement], current: WebElement):
    return [ele for ele in elements if ele.id != current.id]


def get_extra_key_and_label_value(dt: WebElement):
    dt_extra_key = get_dt_extra_key(dt)
    dd_options = get_dt_options(dt)
    dt_label_value = get_checked_option(dd_options)
    return dt_extra_key, dt_label_value, dd_options


def get_dt_extra_key(dt: WebElement):
    dt_label = get_element_text(get_exists_child_element(dt, "label"))
    return get_key_extra_type_that_have_label(dt_label)


def get_dt_options(dt: WebElement):
    dd = get_exists_next_sibling(dt, "dd")
    return get_exists_child_element(dd,
                                    "ul.option-list.darkcontrols > li",
                                    True)


def get_checked_option(dd_options: list[WebElement]):
    dt_label_value = None
    for dd_option in dd_options:
        if get_exists_child_element(dd_option, "input", False).is_selected():
            dt_label_value = get_element_text(get_exists_child_element(dd_option, "label", False))
    return dt_label_value


def add_extra_value(product_common_data, extra_key, extra_value):
    new_product_common_data = product_common_data.copy()
    new_product_common_data[extra_key] = extra_value
    return new_product_common_data


def scroll_to_top_then_wait(driver, wait_seconds):
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.CONTROL + Keys.HOME)
    time.sleep(wait_seconds)


def download_image(image_folder: str, image_url: str, image_url_prefix: str, type: str):
    typed_image_folder = f"{image_folder}/{type}"
    os.system(f"mkdir -p {typed_image_folder}")
    image_url = image_url.strip()
    filename = image_url.split("/")[-1]
    img_data = requests.get(image_url).content
    filepath = f"{typed_image_folder}/{filename}"
    with open(filepath, "wb") as handler:
        handler.write(img_data)
    return f"{image_url_prefix}/{type}/{filename}"
