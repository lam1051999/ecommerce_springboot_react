import mysql.connector
import sqlparse
from mysql.connector.connection import MySQLConnection
from mysql.connector.errors import Error
from typing import List


def get_mysql_connection():
    conn = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password=""
    )
    return conn


def init_database(connection: MySQLConnection, project_dir: str) -> None:
    cursor = connection.cursor()
    with open(f"{project_dir}/sql/init/init_tables.sql", "r") as f:
        content = f.read()
    sql_commands = sqlparse.split(content)
    for commad in sql_commands:
        try:
            cursor.execute(commad)
        except Error as e:
            try:
                print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
            except IndexError:
                print(f"MySQL Error: {str(e)}")
            connection.rollback()
        finally:
            connection.commit()
    cursor.close()


def get_list_dict(set_data: set[object]) -> List[dict]:
    return [e.__dict__ for e in set_data]


def upsert_data(connection: MySQLConnection, table: str, set_data: set[object], key: str) -> None:
    """
    Updates a mysql table with the data provided. If the key is not unique, the
    data will be inserted into the table.

    The dictionaries must have all the same keys due to how the query is built.

    Param:
        connection (MySQLConnection):
            Mysql connection
        table (String):
            The mysql table to be updated.
        set_data (Set[Object]):
            A set of objects where the fields are the mysql table
            column names, and the field values are the update values
        key (String):
            Key of Mysql table to deduplicate
    """
    cursor = connection.cursor()
    data_list = get_list_dict(set_data)
    query = ""
    values = []

    for data_dict in data_list:
        if not query:
            columns = ', '.join('`{0}`'.format(k) for k in data_dict)
            duplicates = ', '.join('{0}=VALUES({0})'.format(k) for k in data_dict if k != key)
            place_holders = ', '.join('%s'.format(k) for k in data_dict)
            query = "INSERT INTO {0} ({1}) VALUES ({2})".format(table, columns, place_holders)
            query = "{0} ON DUPLICATE KEY UPDATE {1}".format(query, duplicates)
        v = list(data_dict.values())
        values.append(v)

    try:
        cursor.executemany(query, values)
    except Error as e:
        try:
            print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
        except IndexError:
            print(f"MySQL Error: {str(e)}")
        connection.rollback()
    finally:
        connection.commit()
        cursor.close()


def get_dict(curs):
    field_names = [d[0].lower() for d in curs.description]
    data = curs.fetchall()
    list_dict = []
    for _data in data:
        list_dict.append(
            {field_names[i]: _data[i] for i, _ in enumerate(_data)}
        )
    return list_dict


def get_showcase_images(connection: MySQLConnection):
    query = "SELECT id, showcase_image FROM `shopdunk`.`products` WHERE showcase_image like 'https://shopdunk.com/%';"
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        rs = get_dict(cursor)
        return rs
    except Error as e:
        try:
            print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
        except IndexError:
            print(f"MySQL Error: {str(e)}")
        finally:
            return []
    finally:
        cursor.close()


def get_product_images(connection: MySQLConnection):
    query = "SELECT id, source, product_id FROM `shopdunk`.`product_images` WHERE source like 'https://shopdunk.com/%';"
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        rs = get_dict(cursor)
        return rs
    except Error as e:
        try:
            print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
        except IndexError:
            print(f"MySQL Error: {str(e)}")
        finally:
            return []
    finally:
        cursor.close()


def update_image_url(connection: MySQLConnection, relative_path: str, id: str, col: str, table: str):
    query = f"UPDATE {table} SET {col} = '{relative_path}' WHERE id = '{id}';"
    print(query)
    cursor = connection.cursor()
    try:
        cursor.execute(query)
    except Error as e:
        try:
            print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
        except IndexError:
            print(f"MySQL Error: {str(e)}")
    finally:
        connection.commit()
        cursor.close()


def get_products_ids(connection: MySQLConnection):
    query = "SELECT id FROM `shopdunk`.`products`;"
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        rs = get_dict(cursor)
        return rs
    except Error as e:
        try:
            print(f"MySQL Error [{e.args[0]}]: {e.args[1]}")
        except IndexError:
            print(f"MySQL Error: {str(e)}")
        finally:
            return []
    finally:
        cursor.close()
