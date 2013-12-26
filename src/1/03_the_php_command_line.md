# The PHP Command Line

---

# The PHP Command Line (1/2)

PHP is an interpreted language, no need for a compiler.

You can try PHP using the command line:

    !bash
    $ php -r 'echo "Hello, World\n"'
    Hello, World

<blockquote class="no-before-icon">
    <i class="fa fa-lightbulb-o"></i>
    <p>Help available by running: <code>php -h</code></p>
</blockquote>

PHP also provides an interactive shell:

    !bash
    $ php -a
    Interactive Shell

    php > echo "Hello, World\n";
    Hello, World

> The command line is really useful, read more about command line options:
[http://php.net/manual/en/features.commandline.options.php](http://php.net/manual/en/features.commandline.options.php).

---

# The PHP Command Line (2/2)

Your new best friend is the _linter_:

    !bash
    $ php -l my/script.php
    No syntax errors detected in my/script.php

<blockquote class="no-before-icon">
    <i class="fa fa-thumb-tack"></i>
    <p>A <strong>linter</strong> is a program that looks for problems in your code
    (<em>syntax errors</em> for instance).</p>
</blockquote>

Embedded web server:

    !bash
    $ php -S localhost:8000

> Learn more about the built-in, command line web server:
[http://www.php.net/manual/en/features.commandline.webserver.php](http://www.php.net/manual/en/features.commandline.webserver.php).

---

# Writing a CLI program

    !php
    #!/usr/bin/env php
    <?php

    if (2 !== $argc) {
        echo "Usage: php $argv[0] [name]\n";
        exit(1);
    }

    $name = $argv[1];
    echo "Hello, $name!\n";

Run the script:

    !bash
    $ ./hello.php
    Usage: ./hello.php [name]

    $ php hello.php
    Usage: php hello.php [name]

    $ php hello.php World
    Hello, World!
