# Model View Controller
---

# MVC Overview

Typical client request process in MVC architecture:

![](../images/mvc.png)

## Presenter notes

1. Client makes a request
1. Controller handles request:
    * interactions with model
    * data preparation
    * send data to view
1. View format data

---

# The Model

**Model** is the layer in charge of data interaction.

All **data related business logic** is embedded here.
Using it should not require to understand internals.

Examples:

* Manipulate **database** records;
* Communicate with **search engine**;
* **API** calls;
* etc.

<blockquote class="no-before-icon">
    <i class="fa fa-bullhorn"></i>
    <p>More on this next week!</p>
</blockquote>

---

# The View

PHP is a templating language per se.

**Never**, **ever**, **ever** mix HTML and PHP codes or kittens
will die: you have to separate the presentation from the business logic.

    !php
    class TemplateEngine
    {
        private $templateDir;

        public function __construct($templateDir)
        {
            $this->templateDir = $templateDir;
        }

        public function render($template, array $parameters = [])
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

Even better with PHP 5.4+:

    !html
    <p>Hello, <?= $name ?>!</p>


### Usage

    !php
    $engine = new TemplateEngine('/path/to/templates');

    echo $engine->render('my_template.html', [
        'name' => 'World',
    ]);
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
    $engine = new Twig_Environment($loader, [
        'cache' => '/path/to/compilation_cache',
    ]);

    echo $engine->render('my_template.html', [
        'name' => 'World',
    ]);
    => <p>Hello, World!</p>

---

# The Controller

**Glue** between the **Model** and the **View** layers.

It **should not** contain any business logic.

    !php
    class BananaController
    {
        public function __construct(
            BananaMapper $mapper,
            TemplateEngineInterface $engine
        ) {
            $this->mapper = $mapper;
            $this->engine = $engine;
        }

        public function listAction()
        {
            $bananas = $this->mapper->findAll();

            return $this->engine->render('list.html', [
                'bananas' => $bananas,
            ]);
        }
    }

---

# Routing

Routing is the process of binding `URI`s to controllers.

## Folder organization

The simplest kind of routing, but also the hardest to maintain:

    !text
    web/
    ├ trees/
    │ └ pineapple.php
    └ tree.php

## Centralized declaration

Modern frameworks all provide a routing component such as **Symfony2 Routing**
component allowing to define all routes in a centralized place and easing
`URI` generation.

This require a single entry point: the **Frontend Controller**.

---

# Front Controller Pattern

A controller that handles all requests for a web application:

![](../images/front-controller.png)

This controller dispatches the request to the **specialized controllers**.

It is usually tied to `URL rewriting`.

---

# Interact With Multiple Services

Web applications become **more and more complex** and interact with
**multiple services** such as:

* [Relational database](http://en.wikipedia.org/wiki/Relational_database) to store consistent data;
* Search engine to index and retrieve documents;
* [Message queues](http://en.wikipedia.org/wiki/Message_queue) to postpone executions or as event brokers;
* External APIs (geocoding, payment, social, ...);
* Mail server to send or receive emails;
* Text message gateway;
* HTTP cache server to reduce resources needs and speed up responses;
* and much much more.
