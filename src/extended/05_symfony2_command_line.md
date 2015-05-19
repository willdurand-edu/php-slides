# Symfony Commands

---

# Built-in Commands (1/2)

    !bash
    $ php app/console


### Global Options

You can get **help** information:

    !bash
    $ php app/console help cmd
    $ php app/console cmd --help
    $ php app/console cmd -h

You can get more verbose messages:

    !bash
    $ php app/console cmd --verbose
    $ php app/console cmd -v [-vv] [-vvv]

You can suppress output:

    !bash
    $ php app/console cmd --quiet
    $ php app/console cmd -q

---

# Built-in Commands (2/2)

    !text
    assets
      assets:install          Installs bundles web assets under a public
                              web directory
    cache
      cache:clear             Clears the cache
      cache:warmup            Warms up an empty cache
    config
      config:dump-reference   Dumps default configuration for an extension
    container
      container:debug         Displays current services for an application
    init
      init:acl                Mounts ACL tables in the database
    router
      router:debug            Displays current routes for an application
      router:dump-apache      Dumps all routes as Apache rewrite rules
      router:match            Helps debug routes by simulating a path info
                              match
    server
      server:run              Runs PHP built-in web server
    translation
      translation:update      Updates the translation file
    twig
      twig:lint               Lints a template and outputs encountered
                              errors

---

# Creating Commands

Create a `Command` directory inside your bundle and create a php file suffixed
with `Command.php` for each command that you want to provide:

    !php
    // src/Acme/DemoBundle/Command/GreetCommand.php
    namespace Acme\DemoBundle\Command;

    use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
    use Symfony\Component\Console\Input\InputInterface;
    use Symfony\Component\Console\Output\OutputInterface;

    class GreetCommand extends ContainerAwareCommand
    {
        protected function configure()
        {
            $this->setName('demo:greet');
        }

        protected function execute(
            InputInterface $input,
            OutputInterface $output
        ) {
            // code ...
        }
    }

---

# Command Arguments

**Arguments** are the strings, separated by spaces, that come after the command
name itself. They are ordered, and can be **optional** or **required**.

    !php
    protected function configure()
    {
        $this
            // ...
            ->addArgument(
                'name',
                InputArgument::REQUIRED,
                'Who do you want to greet?'
            )
            ->addArgument(
                'last_name',
                InputArgument::OPTIONAL,
                'Your last name?'
            );
    }

### Usage

    !php
    $input->getArgument('last_name');

---

# Command Options (1/2)

Unlike arguments, **options are not ordered**, **always optional**, and can be
setup to accept a value or simply as a boolean flag without a value.

    !php
    protected function configure()
    {
        $this
            // ...
            ->addOption(
                'yell',
                null,
                InputOption::VALUE_NONE,
                'If set, the task will yell in uppercase letters'
            );
    }

### Usage

    !php
    // php app/console demo:greet --yell

    if ($input->getOption('yell')) {
        // ...
    }

---

# Command Options (2/2)

    !php
    protected function configure()
    {
        $this
            // ...
            ->addOption(
                'iterations',
                null,
                InputOption::VALUE_REQUIRED,
                'How many times should the message be printed?',
                1
            );
    }

### Usage

    !php
    // php app/console demo:greet --iterations=10

    for ($i = 0; $i < $input->getOption('iterations'); $i++) {
    }

---

# More On Commands

### Getting Services from the Service Container

    !php
    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ) {
        $translator = $this->getContainer()->get('translator');
        // ...
    }

### Calling an existing Command

    !php
    $command   = $this->getApplication()->find('demo:greet');
    $arguments = array(
        'command' => 'demo:greet',
        'name'    => 'Fabien',
        'yell'    => true,
    );

    $returnCode = $command->run(new ArrayInput($arguments), $output);

> [http://symfony.com/doc/master/cookbook/console/index.html](http://symfony.com/doc/master/cookbook/console/index.html)
