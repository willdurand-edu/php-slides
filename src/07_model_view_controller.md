# Model View Controller
---

# MVC overview

Typical client request process in MVC architecture

![](./src/images/MVC.png)

## Presenter notes

1. Client makes a request
1. Controller handles request:
    * interactions with model
    * data preparation
    * send data to view
1. View format data

---

# The Model

**Model** is the layer in charge with data interaction.

All **data logic** is embedded here, user does not require to understand internals.

_Examples_:

* Manipulate **database** records
* Communicate with **search engine**
* **API** calls
* etc.

> More on this next week!

---

# The View

PHP is a templating language per se.

**Never**, **ever**, **ever** mix HTML and PHP codes or kittens
will die: you have to separate the presentation from the business logic.
But creating a template engine is ok!

    !php
    class TemplateEngine
    {
        private $templateDir;

        public function __construct($templateDir)
        {
            $his->templateDir = $templateDir;
        }

        public function render($template, $parameters = array())
        {
            extract($parameters);

            ob_start();
            include $this->templateDir . DIRECTORY_SEPARATOR . $template;

            return ob_get_clean();
        }
    }

---

# The View

### Template

    !html
    <!-- my_template.html -->
    <p>Hello, <?php echo $name; ?>!</p>

Even better with PHP 5.4:

    !html
    <p>Hello, <?= $name ?>!</p>


### Usage

    !php
    $engine = new TemplateEngine('/path/to/templates');

    echo $engine->render('my_template.html', array(
        'name' => 'World',
    ));
    => <p>Hello, World!</p>

---

# The View

**Twig** is a modern template engine for PHP. It takes care of escaping for
you and much much more! Read more:
[http://twig.sensiolabs.org/](http://twig.sensiolabs.org/).

### Template

    !html+django
    {# my_template.html #}
    <p>Hello, {{ name }}!</p>


### Usage

    !php
    $loader = new Twig_Loader_Filesystem('/path/to/templates');
    $engine = new Twig_Environment($loader, array(
        'cache' => '/path/to/compilation_cache',
    ));

    echo $engine->render('my_template.html', array(
        'name' => 'World',
    ));
    => <p>Hello, World!</p>

---

# The Controller

**Glue** between the **Model** and the **View** layers.

It **should not** contain any logic.

    !php
    class BananaController
    {
        public function __construct(BananaMapper $mapper,
                TemplateEngineInterface $engine)
        {
            $this->mapper = $mapper;
            $this->engine = $engine;
        }

        public function listAction()
        {
            $bananas = $this->mapper->findAll();

            return $this->engine->render('list.html', array(
                'bananas' => $bananas,
            ));
        }
    }

---

# Routing

Routing is the process of binding `URI`s to controllers.

## Folder organization

The simplest kind of routing, but also the hardest to maintain.

    web/
    ├ trees/
    │ ├ banana.php
    │ └ pineapple.php
    └ tree.php

## Centralized declaration

Modern frameworks all provide a routing component such as **Symfony2 Routing**
component allowing to define all routes in a centralized place and easing
`URI` generation.

> This require a single entrypoint: the `frontend controller`

---

# Front Controller Pattern

A controller that handles all requests for a web application:

![](http://martinfowler.com/eaaCatalog/frontController-sketch.gif)

This controller dispatches the request to the **specialized controllers**.

> Usually coupled to `URL rewritning`

---

# Interact with multiple services

Web applications becomes **more and more complex** and interract with
**multiple services** such as:

* [Relationnal database](http://en.wikipedia.org/wiki/Relational_database) to store consistent data
* Search engine to index and retrieve documents
* [Message queues](http://en.wikipedia.org/wiki/Message_queue) to postpone executions or as event brokers
* External APIs (geocoding, payment, social...)
* Mail server to send or recieve emails
* Text message gateway
* HTTP cache server to reduce ressources needs and speedup responses
* ...

