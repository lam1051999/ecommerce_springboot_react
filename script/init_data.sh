#!/bin/bash
cat database/shopdunk.sql | docker exec -i database /usr/bin/mysql -u lamtt -plamtt123456 shopdunk