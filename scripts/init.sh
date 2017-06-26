#!/bin/bash

# ===============================================
# CHANGELOG:
#
# * 22.06.2017 - v0.1.0  - initial version
#
# ===============================================


# variables
# ===============================================
version='0.1.0'
PROJECT_NAME=$1 # - projec-name
PROJECT_DESC=$2 # - Project Description
PROJECT_USER_NAME='Eloy Pineda'
PROJECT_USER_MAIL='me@eloy.codes'

# check for mandatory argument
# ===============================================
if [ -z "$1" ]; then
    echo "usage: $0 project-name 'Project Description'"
    exit
fi


# create project folder
# ===============================================
mkdir $PROJECT_NAME
cd $PROJECT_NAME


# Templates definitions
# ===============================================

# README.md .....................................
TEMPLATE_README=$(cat << EOF
# $PROJECT_NAME

$PROJECT_DESC
EOF
)
# ...............................................

# .editorconfig .................................
TEMPLATE_EDITORCONFIG=$(cat  << EOF
# editorconfig.org

root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Trailing whitespace is significant in markdown files.
[*.md]
trim_trailing_whitespace = false

EOF
)
# ...............................................

# .stylelintrc.yml ...............................
TEMPLATE_STYLELINT=$(cat  << EOF
extends:
  stylelint-config-standard

EOF
)
# ...............................................

# .gitigonre ....................................
TEMPLATE_GITIGNORE=$(cat  << EOF
.DS_Store
node_modules

EOF
)
# ...............................................


# write files based on templates
# ===============================================
echo "$TEMPLATE_README" > README.md
echo "$TEMPLATE_EDITORCONFIG" > .editorconfig
echo "$TEMPLATE_STYLELINT" > .stylelintrc.yml

# npm
# ===============================================
npm init -y \
  --init-author-name $PROJECT_USER_NAME \
  --init-author-email $PROJECT_USER_MAIL \
  --init-license MIT --init-version 0.1.0

# git
# ===============================================
git init
echo "$TEMPLATE_GITIGNORE" > .gitigonre
git config user.email $PROJECT_USER_MAIL
git config user.name $PROJECT_USER_NAME
git config user.signingkey $PROJECT_USER_MAIL
git config commit.gpgsign true
git add .
git commit --no-edit -m 'Initial Commit'
