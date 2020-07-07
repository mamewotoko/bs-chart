bs-chart [![Build Status](https://travis-ci.com/mamewotoko/bs-chart.svg?branch=master)](https://travis-ci.com/mamewotoko/bs-chart)
==================

![](image/md_chartjs.png)

Plot with chart.js is embedded in markdeep document.

Examples
--------
* [basic](index.html)
* [markdeep, lines](radical.md.html)

Setup
------

```
setup-opam
npm install
```

Build sample
--------------

```
sh buils.sh
```

Open
-----

1. start web server

```
python3 -m http.server
```

2. browse [docs/index.html](http://localhost:8000/docs/) or [doc/radical.md.html](http://localhost:8000/docs/radical.md.html)

Clean
-----

```
sh clean.sh
```

Files
-------

```
src/main.ml: example app
    chartjs.ml: bindins (library code)
js/main.js: target code
index.html: sample
```


References
----------

* [Chart.js Open source HTML5 Charts for your website](https://www.chartjs.org/)

----
Takashi Masuyama < mamewotoko@gmail.com >

https://mamewo.ddo.jp/
