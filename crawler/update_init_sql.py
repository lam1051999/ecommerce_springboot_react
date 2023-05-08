from utils.database import get_show_create_table, get_mysql_connection, get_all_table_names
import os

if __name__ == "__main__":
    PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
    connection = get_mysql_connection()
    database = "shopdunk"
    list_tables = get_all_table_names(connection, database)
    list_tables = [table[f"tables_in_{database}"] for table in list_tables]
    list_text = []
    try:
        list_text.append("CREATE DATABASE IF NOT EXISTS `shopdunk`;")
        for table in list_tables:
            rs = get_show_create_table(connection, database, table)
            command = rs[0]['create table']
            command = command.replace("CREATE TABLE ", f"CREATE TABLE IF NOT EXISTS `{database}`.")
            command = f"{command};"
            list_text.append(command)
        with open(f"{PROJECT_DIR}/sql/init/init_tables.sql", "w") as f:
            f.write("\n\n".join(list_text))
    except Exception as e:
        print(f"Program exit with exception {e}")
    finally:
        connection.close()
