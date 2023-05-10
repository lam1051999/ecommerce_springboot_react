import argparse
from tqdm import tqdm

from utils.utils import download_image
from utils.database import get_showcase_images, get_mysql_connection, update_image_url, get_product_images

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--parent_folder', required=True)
    parser.add_argument('--image_url_prefix', required=True)
    args = parser.parse_args()
    parent_folder = args.parent_folder
    image_url_prefix = args.image_url_prefix
    connection = get_mysql_connection()
    try:
        showcase_images = get_showcase_images(connection)
        for ele in tqdm(showcase_images, desc="Downloading showcase images"):
            id = ele["id"]
            product_showcase_image = ele["showcase_image"]
            image_folder = f"{parent_folder}/{id}"
            db_image_url_prefix = f"{image_url_prefix}/{id}"
            relative_path = download_image(image_folder, product_showcase_image, db_image_url_prefix, "showcase")
            update_image_url(connection, relative_path, id, "showcase_image", "`shopdunk`.`products`")
        product_images = get_product_images(connection)
        for ele in tqdm(product_images, desc="Downloading product images"):
            id = ele["id"]
            source = ele["source"]
            product_id = ele["product_id"]
            image_folder = f"{parent_folder}/{product_id}"
            db_image_url_prefix = f"{image_url_prefix}/{product_id}"
            relative_path = download_image(image_folder, source, db_image_url_prefix, "images")
            update_image_url(connection, relative_path, id, "source", "`shopdunk`.`product_images`")
    except Exception as e:
        print(f"Program exit with exception {e}")
    finally:
        connection.close()
