#!/bin/bash

# Generate dist/cjs/package.json to change type from ESM to CJS
cat <<EOF > dist/cjs/package.json
{
  "type": "commonjs"
}
EOF
