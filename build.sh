#! /bin/sh
# atdgen -t src/chartjs.atd
# atdgen -j src/chartjs.atd
# sed -i.bak 's/type_:/[@bs.as "type"] type_:/' src/chartjs_t.mli
# corebuild -r -pkg core_extended,yojson,atdgen src/main.native

# build sample
set -e
npm run build
rm -rf js/* examples/js
$(npm bin)/browserify -t babelify examples/src/main.bs.js -o js/main.js
# app2
$(npm bin)/browserify -t babelify examples/src/radical_main.bs.js -o js/radical_main.js
# build example
mkdir -p examples/js/chart.js/
cp -r node_modules/chart.js/dist/* examples/js/chart.js/
cp ext/markdeep.min.js examples/js
cp js/*.js examples/js/
