# PHP

---

# History & Numbers

* Created by Rasmus Lerdorf
* 5th language in the world (TIOBE November 2012)
* 1st language for web development
* Running on 75% of all web servers

---

# Getting Started (1/2)

## Linux Users:

    !bash
    $ sudo apt-get install php5

## Mac Users:

    !bash
    $ brew install php

## Windows Users?

![](http://i.qkme.me/354qno.jpg)

---

# Getting Started (2/2)

The best solution is to use a Virtual Machine (VM): [Vagrant](http://vagrantup.com/).

    !bash
    $ vagrant box add squeeze64 http://dl.dropbox.com/u/937870/VMs/squeeze64.box
    $ vagrant init squeeze64
    $ vagrant up

Then, ssh into your VM:

    !bash
    $ vagrant ssh

---

# The PHP Command Line

PHP is an interpreted language, no need for a compiler.

You can try PHP using the command line:

    !bash
    $ php -r 'echo "Hello, World\n"'
    Hello, World


PHP provides an interactive shell:

    !bash
    $ php -a
    Interactive Shell

    php > echo "Hello, World\n";
    Hello, World


But, your best friend will be the _linter_:

    !bash
    $ php -l my/script.php
    No syntax errors detected in my/script.php


> The command line is really useful, read more about command line options at:
[http://php.net/manual/en/features.commandline.options.php](http://php.net/manual/en/features.commandline.options.php).

---

# The PHP Syntax (1/x)

## Primitive Types

* 4 **scalar** types: `boolean`, `integer`, `float`, `string`;
* 2 **compound** types: `array`, `object`;
* 2 **special types**: `resource`, `null`;

And 3 **pseudo types**: `mixed`, `number`, `callback`.

**Note:** most of these types have aliases. E.g. `double` for `float`.

> Read more about the PHP primitive types at:
[http://www.php.net/manual/en/language.types.intro.php](http://www.php.net/manual/en/language.types.intro.php).

---

# The PHP Syntax (2/x)

    !php
    <?php

    namespace Vendor\Model;

    class Foo
    {
        const VERSION   = '1.0';

        public $bar     = null;

        protected $opts = array();

        private $var3   = 123;

        public function __construct(BarInterface $bar, $opts = array())
        {
            $this->bar  = $bar;
            $this->opts = $opts;
        }
    }

> Learn more about Coding Standards with [PSR-1](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-1-basic-coding-standard.md) and [PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) recommendations.

---

# The PHP Syntax (3/x)

## Namespaces

Namespaces prevent naming collisions with identifiers such as function, class,
and interface names:

    !php
    namespace Vendor\Model;
    // ...

Or:

    !php
    namespace MyNamespace {
        // ...
    }


