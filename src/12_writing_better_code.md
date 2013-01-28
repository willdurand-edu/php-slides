# Writing Better Code

---

# Agenda

* Coding Standards
* Programming To The Interface
* Component Driven Development
* Dependency Injection

---

# Coding Standards

    !php
    <?php

    namespace Vendor\Model;

    class Foo
    {
        const VERSION   = '1.0';

        public $bar     = null;

        protected $opts = array();

        private $var3   = 123;

        public function __construct(BarInterface $bar, $opts = array())
        {
            $this->bar  = $bar;
            $this->opts = $opts;
        }
    }

> Read more about **coding standards** with
> [PSR-1](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-1-basic-coding-standard.md)
> and
> [PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).

---

# PHP Coding Standards Fixer

The PHP Coding Standards Fixer tool fixes most issues in your code when
you want to follow the PHP coding standards as defined in the PSR-1 and
PSR-2 documents.

Installation:

    !bash
    $ wget http://cs.sensiolabs.org/get/php-cs-fixer.phar

Usage:

    !bash
    $ php php-cs-fixer.phar fix /path/to/dir/or/file

> [http://cs.sensiolabs.org/](http://cs.sensiolabs.org/).

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

It’s all about **Separation of Concerns** (SoC).

You design components with their own logic, each component does **one thing
well**, and **only one thing**.

How to manage these components in your application?

> Read [Component Driven Development: it's like Lego!](http://williamdurand.fr/2012/02/01/component-driven-development-it-s-like-lego/).

---

# Dependency Injection

Design Pattern that allows a choice of component to be made at **runtime**
rather than compile time.

Most of the time, you rely on configuration files to describe your **classes**
and their **dependencies**.

A **class** in this context is also known as a **service**, and all services live
in a **service container** or **dependency injection container**.

You ask this container to retrieve a service, and it is **lazy loaded** and dynamically
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
