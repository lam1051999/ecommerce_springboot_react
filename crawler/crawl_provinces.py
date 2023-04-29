import time

from selenium import webdriver
from utils.utils import get_exists_css_selector, get_element_text
from utils.models import Provinces, ShopdunkShops
from utils.database import get_mysql_connection, upsert_data

if __name__ == "__main__":
    set_provinces = set()
    set_shopdunk_shops = set()
    driver = webdriver.Chrome()
    driver.get("https://shopdunk.com/macbook-pro-m2-2022")
    button = get_exists_css_selector(driver, "#add-to-cart-button-1824", False)
    button.click()
    time.sleep(5)
    list_province_options = get_exists_css_selector(driver, "#BillingNewAddress_StateProvinceId > option", True)
    list_province_options = [province for province in list_province_options if province.get_attribute("value") != "0"]
    for province_element in list_province_options:
        province = get_element_text(province_element)
        province_element.click()
        list_district_options = get_exists_css_selector(driver, "#BillingNewAddress_CountyId > option", True)
        list_district_options = [district for district in list_district_options if
                                 district.get_attribute("value") != "0"]
        for district_element in list_district_options:
            district = get_element_text(district_element)
            province_model = Provinces(
                province_name=province,
                district_name=district
            )
            set_provinces.add(province_model)
            district_element.click()
            shopdunk_options = get_exists_css_selector(driver,
                                                       "div.all_receive_store > div.choose_area_store > div.select_receive_store > select > option",
                                                       True)
            shopdunk_options = [shopdunk for shopdunk in shopdunk_options if shopdunk.get_attribute("value") != ""]
            for shopdunk_element in shopdunk_options:
                shopdunk = get_element_text(shopdunk_element)
                shopdunk_shops_model = ShopdunkShops(
                    name=shopdunk,
                    province_id=province_model.id
                )
                set_shopdunk_shops.add(shopdunk_shops_model)
    connection = get_mysql_connection()
    upsert_data(connection, "`shopdunk`.`provinces`", set_provinces, "id")
    upsert_data(connection, "`shopdunk`.`shopdunk_shops`", set_shopdunk_shops, "id")
    driver.quit()
