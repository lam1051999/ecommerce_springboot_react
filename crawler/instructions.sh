# crawl data
python crawl.py --crawl_category=ALL --crawl_type=DATA

# download images
python /Users/tranlammacbook/Documents/react_typescript/clone_shopdunk/crawler/process_images.py \
  --parent_folder=/Users/tranlammacbook/Documents/react_typescript/clone_shopdunk/images/products_images \
  --image_url_prefix=/images/products_images

# fill stocks
python fill_stocks.py

# crawl provinces, shopdunk shops
python crawl_provinces.py

# update init mysql tables
python update_init_sql.py