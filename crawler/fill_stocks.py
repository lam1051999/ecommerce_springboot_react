import random

from utils.database import get_products_ids, get_mysql_connection, upsert_data
from utils.models import Stocks

if __name__ == "__main__":
    connection = get_mysql_connection()
    try:
        ids = get_products_ids(connection)
        result_set = set()
        for id in ids:
            result_set.add(Stocks(
                quantity=random.randint(3, 10),
                product_id=id["id"]
            ))
        upsert_data(connection, "`shopdunk`.`stocks`", result_set, "id")
    except Exception as e:
        print(f"Program exit with exception {e}")
    finally:
        connection.close()
