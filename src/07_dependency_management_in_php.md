# Dependency Management in PHP

---

# Dependency Management

There are a ton of PHP libraries, frameworks, and components to choose from.
Most of them have different versions, and don't always work well together.

**Composer** is a tool for dependency management in PHP. It allows you to declare
the dependent libraries your project needs and it will install them in your
project for you.

A lot of PHP libraries are compatible with Composer and listed on
[Packagist](http://packagist.org/), the official repository for Composer-compatible
PHP libraries.

    !bash
    $ curl -s https://getcomposer.org/installer | php

This will download `composer.phar` (a PHP binary archive).

> Read more about **Composer**:
[http://getcomposer.org/doc/00-intro.md](http://getcomposer.org/doc/00-intro.md).

---

# Composer

Create a `composer.json` file in your project's root directory:

    !javascript
    {
        "require": {
            "willdurand/geocoder": "1.1.*"
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

---

# Example

Instead of writing a console application by hand, let's use an existing library:
the **Symfony2 Console** component:

    !json
    {
        "require": {
            "symfony/console": "v2.1.5"
        }
    }

The structure of your application should look like:

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

        protected function execute(InputInterface $input,
            OutputInterface $output)
        {
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

    $ app/console demo:greet
    Hello, World
    $ app/console demo:greet William
    Hello, William

> [http://symfony.com/doc/master/components/console/introduction.html](http://symfony.com/doc/master/components/console/introduction.html).
