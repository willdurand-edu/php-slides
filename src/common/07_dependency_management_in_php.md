# Dependency Management

---

# Composer

There are a ton of PHP libraries, frameworks, and components to choose from.
Most of them have different versions, and don't always work well together.

**Composer** is a tool for dependency management in PHP. It allows you to declare
the dependent libraries your project needs and it will install them in your
project for you.

A lot of [awesome PHP libraries](https://github.com/ziadoz/awesome-php) are
compatible with Composer and listed on [Packagist](http://packagist.org/), the
official repository for Composer-compatible PHP libraries.

    !bash
    $ curl -sS https://getcomposer.org/installer | php

This will download `composer.phar` (a PHP binary archive).

> [http://getcomposer.org/doc/00-intro.md](http://getcomposer.org/doc/00-intro.md)

---

# `composer install`

Create a `composer.json` file in your project's root directory:

    !javascript
    {
        "require": {
            "willdurand/geocoder": "~2.0"
        }
    }

You can also require a library by using the `require` command:

    !bash
    $ php composer.phar require willdurand/geocoder

Run the following command to download and install the project dependencies into
a `vendor` directory:

    !bash
    $ php composer.phar install

> [Composer Version
Constraints](https://igor.io/2013/01/07/composer-versioning.html)

---

# Composer Autoloader

Composer automatically generates a [PSR-4](http://www.php-fig.org/psr/psr-4/)
compliant and optimized autoloader for your entire application. Thanks to
Composer, you don't have to take care about how to autoload classes/functions
anymore.

Require the generated autoloader in your project as follows:

    !php
    <?php

    require 'vendor/autoload.php';

    // your PHP code

> Must read: [Composer Primer](http://daylerees.com/composer-primer).
