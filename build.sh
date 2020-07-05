#! /bin/sh
# atdgen -t src/chartjs.atd
# atdgen -j src/chartjs.atd
# sed -i.bak 's/type_:/[@bs.as "type"] type_:/' src/chartjs_t.mli
# corebuild -r -pkg core_extended,yojson,atdgen src/main.native

# build sample
set -e
npm run build
$(npm bin)/browserify -t babelify src/main.bs.js -o src/main.js
