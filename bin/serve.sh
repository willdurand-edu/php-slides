#!/usr/bin/env bash
#
# Tiny shell script that serves an HTML file
# on a given port.

if [ -z "$PORT" ] ; then
    PORT=4000
fi

if [ -z "$HTML_FILE" ] ; then
    HTML_FILE='presentation.html'
fi

while [ $? -eq 0 ] ; do
    nc -lp $PORT -c "cat $HTML_FILE"
done
