# Model View Controller

---

# The View

PHP is a templating language per se.

**Never**, **ever**, **ever** mix HTML and PHP codes or kittens
will die. But creating a template engine is ok!

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

# Front Controller Pattern

A controller that handles all requests for a web application:

![](http://martinfowler.com/eaaCatalog/frontController-sketch.gif)

This controller dispatches the request to the **specialized controllers**.

---

# Programming To The Interface

Reduces dependency on implementation specifics and makes code more reusable.

The `BananaController` can use either **Twig** or the raw PHP implementation
as template engine thanks to the `TemplateEngineInterface`:

    !php
    interface TemplateEngineInterface
    {
        /**
         * @param string $template
         * @param array  $parameters
         *
         * @return string
         */
        public function render($template, array $parameters = array());
    }

You should think about interfaces, not about internal implementation details.

---

# Component Driven Development

**Separation of concerns**.

---

# Dependency Injection

Design Pattern that allows a choice of component to be made at **runtime**
rather than compile time.

Most of the time, you rely on configuration files to describe your **classes**
and their **dependencies**.

A **class** in this context is also known as a **service**, and all services live
in a **service container** or **dependency injection container**.

You ask this container to retrive a service, and it is **lazy loaded** and dynamically
built:

    !php
    // It's an instance of TemplateEngineInterface, but you don't know
    // anything about its internal implementation.
    // Is it the raw PHP implementation or Twig?
    $engine = $container->get('template_engine');

---

# Dependency Injection

### Constructor Injection

All dependencies are **injected** using a **constructor**:

    !php
    class Foo
    {
        private $bar;

        public function __construct(BarInterface $bar)
        {
            $this->bar = $bar;
        }
    }

---

# Dependency Injection

### Setter Injection

Dependencies are **injected** through **setters**:

    !php
    class Foo
    {
        private $bar;

        public function setBar(BarInterface $bar)
        {
            $this->bar = $bar;
        }
    }

---

# Dependency Injection

### Interface Injection

An interface describes the **injection**:

    !php
    interface BarAware
    {
        public function setBar(BarInterface $bar);
    }

It needs to be implemented by the class that wants to use a `BarInterface`:

    !php
    class Foo implements BarAware
    {
        private $bar;

        public function setBar(BarInterface $bar)
        {
            $this->bar = $bar;
        }
    }

---

# PHP Implementations

### Twittee

[Twittee](https://github.com/fabpot/twittee) is the **smallest** Dependency Injection
Container written in PHP.
It fits in a _tweet_ (less than 140 characters):

    !php
    class Container
    {
        protected $s = array();

        function __set($k, $c)
        {
            $this->s[$k] = $c;
        }

        function __get($k)
        {
            return $this->s[$k]($this);
        }
    }

---

# PHP Implementations

### Pimple

[Pimple](https://github.com/fabpot/Pimple) is a small Dependency Injection Container
for PHP 5.3 that consists of just one file and one class.

### The Symfony2 DependencyInjection Component

The [DependencyInjection](https://github.com/symfony/DependencyInjection) component
allows you to standardize and centralize the way objects are constructed in your
application.

> Read more:
>
> * [http://symfony.com/doc/current/book/service_container.html](http://symfony.com/doc/current/book/service_container.html);
> * [http://symfony.com/doc/current/components/dependency_injection/](http://symfony.com/doc/current/components/dependency_injection/).
