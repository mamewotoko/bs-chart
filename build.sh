#! /bin/sh
atdgen -t src/chartjs.atd
atdgen -j src/chartjs.atd
corebuild -r -pkg core_extended,yojson,atdgen src/main.native
