from selenium import webdriver

import time
import os
import argparse

from utils.url import BASE_URL
from utils.utils import get_exists_css_selector, is_has_child, get_product_specific_data, click_by_action, \
    PRODUCT_CHOICES, get_products_objects, get_product_images_objects, \
    get_product_infos_objects, get_product_rating_objects, get_exists_child_element, get_element_text, \
    get_key_extra_type_that_have_label, get_product_common_data_remake, produce_none_value_extra_type, \
    get_exists_next_sibling, is_only_one_option_page, get_final_data_remake, get_product_colors_images_map, \
    get_not_color_dts, get_color_dt, get_other_elements_in_list, get_dt_options, get_extra_key_and_label_value, \
    get_dt_extra_key, scroll_to_top_then_wait
from utils.database import get_mysql_connection, init_database, upsert_data

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))


def crawl_remake(product_url, product_sub_type):
    driver = webdriver.Chrome()
    driver.maximize_window()
    list_products = []
    url = f"{BASE_URL}/{product_url}"
    driver.get(url)
    list_product_link_in_url = [ele.get_attribute("href") for ele in get_exists_css_selector(driver,
                                                                                             "div.product-grid > div.item-grid > div.item-box > div.product-item > div.picture > a",
                                                                                             True)]
    for link in list_product_link_in_url:
        print(f"Start getting {link}")
        driver.get(link)
        dts = [element for element in get_exists_css_selector(driver, "div.attributes > dl > dt", True) if
               is_has_child(element, "label") and element.is_displayed()]
        product_common_data = get_product_common_data_remake(driver, link)
        product_common_data = produce_none_value_extra_type(product_common_data)
        if len(dts) == 0:
            actual_price, old_price = get_product_specific_data(driver)
            colors_images_map = get_product_colors_images_map(driver, None)
            final_data = get_final_data_remake(product_common_data, actual_price, old_price, colors_images_map,
                                               link, product_sub_type)
            list_products.append(final_data)
        else:
            if is_only_one_option_page(dts):
                for not_color_dt in get_not_color_dts(dts):
                    not_color_dt_label = get_element_text(get_exists_child_element(not_color_dt, "label"))
                    not_color_extra_key = get_key_extra_type_that_have_label(not_color_dt_label)
                    not_color_dd = get_exists_next_sibling(not_color_dt, "dd")
                    not_color_dd_value = get_element_text(get_exists_child_element(not_color_dd,
                                                                                   "ul.option-list.darkcontrols > li > a > label.checked-attr",
                                                                                   False))
                    product_common_data[not_color_extra_key] = not_color_dd_value
                actual_price, old_price = get_product_specific_data(driver)
                color_dt = get_color_dt(dts)
                color_dd = get_exists_next_sibling(color_dt, "dd")
                colors_images_map = get_product_colors_images_map(driver, color_dd)
                final_data = get_final_data_remake(product_common_data, actual_price, old_price, colors_images_map,
                                                   link, product_sub_type)
                list_products.append(final_data)
            else:
                color_dt = get_color_dt(dts)
                color_dd = get_exists_next_sibling(color_dt, "dd")
                colors_images_map = get_product_colors_images_map(driver, color_dd)
                not_color_dts = get_not_color_dts(dts)
                scroll_to_top_then_wait(driver, 1)
                for current_not_color_dt in not_color_dts:
                    current_not_color_dt_extra_key = get_dt_extra_key(current_not_color_dt)
                    current_not_color_dd_options = get_dt_options(current_not_color_dt)
                    other_not_color_dts = get_other_elements_in_list(not_color_dts, current_not_color_dt)
                    temp_other_not_color_dts_map = {}
                    for other_not_color_dt in other_not_color_dts:
                        other_not_color_dt_extra_key, other_not_color_dt_label_value, other_not_color_dd_options = get_extra_key_and_label_value(
                            other_not_color_dt)
                        temp_other_not_color_dts_map[other_not_color_dt_extra_key] = other_not_color_dt_label_value

                    for current_not_color_dd_option in current_not_color_dd_options:
                        click_by_action(driver, current_not_color_dd_option)
                        time.sleep(1)
                        current_not_color_dd_option_value = get_element_text(
                            get_exists_child_element(current_not_color_dd_option, "label", False))
                        new_product_common_data = product_common_data.copy()
                        new_product_common_data[current_not_color_dt_extra_key] = current_not_color_dd_option_value
                        for (key, val) in temp_other_not_color_dts_map.items():
                            new_product_common_data[key] = val
                        actual_price, old_price = get_product_specific_data(driver)
                        final_data = get_final_data_remake(new_product_common_data, actual_price, old_price,
                                                           colors_images_map,
                                                           link, product_sub_type)
                        list_products.append(final_data)
    driver.quit()
    return list_products


def crawl_unique_spec(product_url):
    driver = webdriver.Chrome()
    special_tags = ['Loại Sản Phẩm', 'Chọn loại', 'nhắc văn bản', 'Storage_PP', 'Chọn màu =', 'Chọn màu =', 'Chọn màu',
                    'Chọn màu', 'Combo màu', 'Kích cỡ']
    list_specs = set()
    url = f"{BASE_URL}/{product_url}"
    driver.get(url)
    list_product_link_in_url = [ele.get_attribute("href") for ele in get_exists_css_selector(driver,
                                                                                             "div.product-grid > div.item-grid > div.item-box > div.product-item > div.picture > a",
                                                                                             True)]
    for link in list_product_link_in_url:
        driver.get(link)
        dts = [element for element in get_exists_css_selector(driver, "div.attributes > dl > dt", True) if
               is_has_child(element, "label") and element.is_displayed()]
        for dt in dts:
            dt_label = get_element_text(get_exists_child_element(dt, "label", False))
            list_specs.add(dt_label)
            if dt_label in special_tags:
                print(f"Tag: {dt_label}, link: {link}")
    driver.quit()
    return list_specs


def process_crawl_data_remake(main_url_sub_type, product_type):
    for (product_url, product_sub_type) in main_url_sub_type.items():
        print(f"Start crawl data, product url: {product_url}, product type: {product_type}")
        list_products = crawl_remake(product_url, product_sub_type)
        connection = get_mysql_connection()
        try:
            init_database(connection, PROJECT_DIR)
            set_products = get_products_objects(list_products, product_type)
            set_product_images = get_product_images_objects(list_products)
            set_product_infos = get_product_infos_objects(list_products)
            set_product_ratings = get_product_rating_objects(list_products)
            upsert_data(connection, "`shopdunk`.`products`", set_products, "id")
            upsert_data(connection, "`shopdunk`.`product_images`", set_product_images, "id")
            upsert_data(connection, "`shopdunk`.`product_infos`", set_product_infos, "id")
            upsert_data(connection, "`shopdunk`.`product_ratings`", set_product_ratings, "id")
            print("Finish crawl data")
        except Exception as e:
            print(f"Program exit with exception {e}")
        finally:
            connection.close()
        print(f"Finish crawl data, product url: {product_url}, product type: {product_type}")


def process_crawl_spec(main_url_sub_type, product_type):
    print(f"Start crawl specs, product type: {product_type}")
    for (product_url, product_sub_type) in main_url_sub_type.items():
        list_specs = crawl_unique_spec(product_url)
        print(
            f">>>>>>>>>>>>>>>> List specs of products {product_type}, {product_url}, {product_sub_type}: {list_specs}")
        print(f"Finish crawl specs")


def do_process(main_url_sub_type, product_type, crawl_type):
    if crawl_type == "DATA":
        process_crawl_data_remake(main_url_sub_type, product_type)
    else:
        process_crawl_spec(main_url_sub_type, product_type)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--crawl_category', required=True, choices=list(PRODUCT_CHOICES.keys()).append("ALL"))
    parser.add_argument('--crawl_type', required=True, choices=["DATA", "SPECS"])
    args = parser.parse_args()
    crawl_category = args.crawl_category
    crawl_type = args.crawl_type

    if crawl_category == "ALL":
        for (product_type, main_url_sub_type) in PRODUCT_CHOICES.items():
            do_process(main_url_sub_type, product_type, crawl_type)
    else:
        product_type = crawl_category
        main_url_sub_type = PRODUCT_CHOICES[crawl_category]
        do_process(main_url_sub_type, product_type, crawl_type)
