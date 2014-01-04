# Dependency Management in PHP

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

You can also require a library by using the `composer` command:

    !bash
    $ php composer.phar require "willdurand/geocoder:~2.0"

Run the following command to download and install the project dependencies into
a `vendor` directory:

    !bash
    $ php composer.phar install

> [Composer Version
Constraints](https://igor.io/2013/01/07/composer-versioning.html)

---

# Composer Autoloader

Composer automatically generates a PSR-0 compliant and optimized autoloader for
your entire application. Thanks to Composer, you don't have to take care about
how to autoload classes/functions anymore.

Require the generated autoloader in your project as follows:

    !php
    <?php

    require 'vendor/autoload.php';

    // your PHP code


> Must read: [Composer Primer](http://daylerees.com/composer-primer).

---

# Example

Instead of writing a console application by hand, let's use an existing library:
the **Symfony2 Console** component:

    !json
    {
        "require": {
            "symfony/console": "~2.4"
        }
    }

The structure of your application should look like:

    !text
    console-app
    ├── app
    │   └── console
    ├── composer.json
    ├── src
    ├── tests
    └── vendor

---

# The Symfony2 Console Component

The easiest way to write **strong console applications**:

* Create a set of commands;
* Add them to a console application.

Your _Commands_ should extend the `Command` class:

    !php
    class GreetCommand extends Command
    {
        protected function configure()
        {
            // configure the name, arguments, options, etc.
        }

        protected function execute(
            InputInterface $input,
            OutputInterface $output
        ) {
        }
    }

---

# A Basic Command (1/2)

### Configuration

    !php
    $this
        ->setName('demo:greet')
        ->addArgument(
            'name',
            InputArgument::OPTIONAL,
            'Who do you want to greet?'
        );


### Execution

    !php
    if (null === $name = $input->getArgument('name')) {
        $name = 'World';
    }

    $output->writeln('Hello, ' . $name);

---

# A Basic Command (2/2)

### The Console Application

    !php
    #!/usr/bin/env php
    # app/console
    <?php

    // require the Composer autoloader
    require __DIR__ . '/../vendor/autoload.php';

    $application = new Application();
    $application->add(new GreetCommand());
    $application->run();

### Usage

    !bash
    $ app/console demo:greet
    Hello, World
    $ app/console demo:greet William
    Hello, William

> Read more:
[http://symfony.com/doc/current/components/console/](http://symfony.com/doc/current/components/console/index.html).
