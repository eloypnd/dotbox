#!/bin/bash

# ===============================================
# CHANGELOG:
#
# * 22.06.2017 - v0.1.0  - initial version
# * 28.07.2017 - v0.2.0  - add js and css linters
#
# ===============================================


# variables
# ===============================================
version='0.2.0'
PROJECT_NAME=$1 # - projec-name
PROJECT_DESC=$2 # - Project Description
PROJECT_USER_NAME='Eloy Pineda'
PROJECT_USER_MAIL='me@eloy.codes'
PROJECT_VERSION='0.1.0'

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

# .gitignore ....................................
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
  --init-license MIT --init-version $PROJECT_VERSION

# git
# ===============================================
git init
echo "$TEMPLATE_GITIGNORE" > .gitignore
git config user.email $PROJECT_USER_MAIL
git config user.name $PROJECT_USER_NAME
git config user.signingkey $PROJECT_USER_MAIL
git config commit.gpgsign true
# git: initial commit
git add .
git commit --no-edit -m 'Initial Commit'

# install linters
# ===============================================
printf "\nInstalling js and css linters...\n"
npm install --save-dev standard stylelint stylelint-config-standard
# check node is installed
if hash node 2>/dev/null; then
  echo "Adding linting scripts to package.json..."
else
  echo >&2 ">> Error: node required but not installed."
  exit 1
fi
# run a short javascript with node to add npm scripts to package.json
node << EOF
const fs = require('fs')
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const pkgScripts = pkg.scripts || {}
  // add new js and css linting scripts
  pkgScripts['lint'] = 'npm run lint:js && npm run lint:css'
  pkgScripts['lint:css'] = 'stylelint src/**/*.css'
  pkgScripts['lint:js'] = 'standard'
  // sort npm scripts keys
  pkg.scripts = {}
  Object.keys(pkgScripts)
    .sort()
    .forEach(key => pkg.scripts[key] = pkgScripts[key])
  fs.writeFileSync('package.json', \`\${JSON.stringify(pkg, null, 2)}\n\`)
} catch (e) {
  console.error('>> ', e.stack)
}
EOF
# git: commit linters
git add package.json
git commit --no-edit -m 'chore: add js and css linters'
git add package-lock.json
git commit --no-edit -m 'chore: add package-lock.json'

# successful finish
# ===============================================
printf "\nProject $PROJECT_NAME created.\n"
exit 1
