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

        protected function execute(InputInterface $in, OutputInterface $out) {
            // do greet
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
