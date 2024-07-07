#!/bin/bash

docker run -it --rm --name camera1install -v "$(pwd)":/usr/src/app -w /usr/src/app node:14 npm install