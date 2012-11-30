LicPro-Slides
=============

PHP lessons by [Julien Muetton](http://github.com/themouette) and
[William Durand](http://github.com/willdurand).


Installation
------------

Get the code:

    git clone git://github.com/willdurand/licpro-slides.git
    git submodule update --init

Install [landslide](https://github.com/adamzap/landslide#installation), then
build the presentation:

    landslide config.cfg


Usage
-----

Basically, just build the presentation and open it in your favorite browser.

If you need to serve it through a socket, a shell script is provided to serve
the presentation on a given port (default: `4000`):

    bin/serve.sh

You can modify the port:

    PORT=8080 bin/serve.sh

You can also modify the HTML filename:

    HTML_FILE=something.html bin/serve.sh

