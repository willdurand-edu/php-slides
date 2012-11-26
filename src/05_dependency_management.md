# Dependency Management in PHP

---

# Dependency Management

There are a ton of PHP libraries, frameworks, and components to choose from.
Most of them have different versions, and don't always work well together.

**Composer** is a tool for dependency management in PHP. It allows you to declare
the dependent libraries your project needs and it will install them in your
project for you.

A lot of PHP libraries are compatible with Composer and listed on [Packagist
](http://packagist.org/), the official repository for Composer-compatible PHP
libraries.

    !bash
    $ curl -s https://getcomposer.org/installer | php

This will download `composer.phar` (a PHP binary archive).

> Read more about Composer:
[http://getcomposer.org/doc/00-intro.md](http://getcomposer.org/doc/00-intro.md).

---

# Composer

Create a `composer.json` file in your project's root directory:

    !javascript
    {
      "require": {
        "willdurand/geocoder": "dev-master"
      }
    }

Run the following command to download and install the project dependencies into
a `vendor` directory:

    !bash
    $ php composer.phar install

Require the generated autoloader in your project:

    !php
    <?php

    require 'vendor/autoload.php';

