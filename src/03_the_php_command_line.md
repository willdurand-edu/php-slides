# The PHP Command Line

---

# The PHP Command Line (1/2)

PHP is an interpreted language, no need for a compiler.

You can try PHP using the command line:

    !bash
    $ php -r 'echo "Hello, World\n"'
    Hello, World


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

    $application = new Application();
    $application->add(new GreetCommand());
    $application->run();


### Usage

    $ app/console demo:greet
    Hello, World

    $ app/console demo:greet William
    Hello, William

> [http://symfony.com/doc/master/components/console/introduction.html](http://symfony.com/doc/master/components/console/introduction.html).
