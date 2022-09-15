#!/bin/sh

set -e

mkdir -p src/__generated__

peggy --allowed-start-rules schema,field_type,expression -o src/__generated__/parser.js src/grammar.pegjs
