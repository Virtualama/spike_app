#!/bin/bash

CURR_DIR=$(dirname $0)

wget -c -nH -ri ${CURR_DIR}/export.txt -P ${CURR_DIR}/../tiles
