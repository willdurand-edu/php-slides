PHP Autoloading
===============

---

Include other files
===================

`PHP` language does not magically load classes by itself.

You have to manually include class declaration:

    !php
    class Octopus
    {
        public function scream()
        {
            echo "o o O O  ° °";
        }
    }

To create a new `Octopus`:

    !php
    $paul = new Octopus();
    $paul->scream();

As class declaration is not included, php raises a `Fatal error`:

    !bash
    Fatal error: Class 'Octopus' not found in /path/to/file.php

---

Using include
=============

To create a new `Octopus`:

    !php
    require __DIR__ . "../Model/Octopus.php";

    $paul = new Octopus();
    $paul->scream();

It works !

What happens when class is included somewhere else ?

    !php
    // somewhere further in your application
    require __DIR__ . "../Model/Octopus.php";

    class Squid extends Octopus
    {
    }

Php raises a Fatal error:

    !bash
    Fatal error: Cannot redeclare class Octopus in /path/to/file.php


---

Using require_once
==================

The `require_once` statement is identical to `require` except PHP will check if
the file has already been included.

    !php
    require_once __DIR__ . "../Model/Octopus.php";

    $paul = new Octopus();
    $paul->scream();

And somewhere else:

    !php
    // somewhere further in your application
    require_once __DIR__ . "../Model/Octopus.php";

    class Squid extends Octopus
    {
    }

> problem solved !

---

Anatomy of a big library
========================

Explicit `includes` can turn into nightmare when your library/project turns big.

    !php
    <?php

    /**
     * lib/Model/Location.php
     */
    require_once __DIR__ . "/../../common.php";
    require_once DOCROOT . "/lib/Model/ModelInterface.php";
    require_once DOCROOT . "/lib/Model/User.php";
    require_once DOCROOT . "/lib/Validator/Email.php";
    require_once DOCROOT . "/lib/Validator/Username.php";
    require_once DOCROOT . "/lib/Validator/Url.php";

    class Location implements ModelInterface
    {
        /* ... */
    }

---

Removing includes
=================

Php 5.2 and upper provide a usable autoloading api with performances close to
require through following functions:

* `__autoload()`: main autoload callback
* `spl_autoload_register()`: Register a new autoload callback
* `spl_autoload_unregister()`: Unregister an autoload callback
* `spl_autoload_functions()`: List all autoload methods

---

Examples
========

## `__autoload()`

    !php
    function __autoload($className)
    {
        require __DIR__ . DIRECTORY_SEPARATOR . $className . '.php';
    }

## `spl_autoload_register()`

    !php
    function my_autoload($className)
    {
        require __DIR__ . DIRECTORY_SEPARATOR . $className . '.php';
    }
    spl_autoload_register("my_autoload");

## `spl_autoload_unregister()`

    !php
    spl_autoload_unregister("my_autoload");

---

Under the Hood (`new` pseudo algorithm)
=======================================

    !php
    new Foo();

* Does "Foo" class exists ?
    * Yes: go on
    * No:
        * Is there `spl_autoloaders` ?
            * Yes: call all `spl_autoloaders` with "Foo" as parameter
                until class is included
            * No: is there a `__autoload` method ?
                * Yes: call `__autoload("Foo")`
* Does "Foo" class exists ?
    * Yes: continue
    * No: Fatal error
