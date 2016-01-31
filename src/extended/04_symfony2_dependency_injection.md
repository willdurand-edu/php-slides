# Service Container

---

# What Is A Service?

A **Service** is a generic term for any PHP object that performs a specific task.

A service is usually used **globally**, such as a database connection object or an
object that delivers email messages.

In Symfony, services are often **configured and retrieved from the service
container**.

An application that has many decoupled services is said to follow a
**Service-Oriented Architecture** (SOA).

---

# What Is A Service Container?

A **Service Container**, also known as a **Dependency Injection Container**
(DIC), is a special object that **manages the instantiation of services** inside
an application.

The service container takes care of **lazily instantiating** and **injecting
dependent services**.

---

# Creating A Service

    !php
    class Foo
    {
        private $bar;
        private $debug;

        public function __construct(Bar $bar = null, $debug = false)
        {
            $this->bar = $bar;
            $this->debug = $debug;
        }
    }

The **service definition** for the class described above is:

    !yaml
    # app/config/services.yml
    services:
        foo:
            class: 'My\Bundle\Foo'

This service is now available in the container, and you can access it by
**asking** the service from the container:

    !php
    $foo = $this->container->get('foo');

---

# Service Parameters

The service definition described before is not flexible enough. For instance,
`$debug` argument is never configured.

**Parameters** make defining services more **organized** and **flexible**:

    !yaml:
    # app/config/parameters.yml
    parameters:
        my_api_key: ABCD

    !yaml
    # app/config/services.yml
    services:
        foo:
            class:     'My\Bundle\Foo'
            arguments: [ ~, '%my_api_key%', '%kernel.debug%' ]

In the definition above, `my_api_key` is a parameter defined at the application level and
`kernel.debug` is a defined by the framework itself. The `foo` service is now **parametrized**.

---

# Injecting Services

As you may noticed, the `Foo` class takes an instance of `Bar` as first
argument. You can **inject** this instance in your `foo` service by
**referencing** the `bar` service:

    !yaml
    services:
        foo:
            class: 'My\Bundle\Foo'

        bar:
            class:     'My\Bundle\Bar'
            arguments: [ '@foo', '%kernel.debug%' ]

### Optional Dependencies: Setter Injection

    !yaml
            calls:
                 - [ 'setBar', [ '@bar' ] ]

---

# Importing Configuration Resources

### The `imports` Way

    !yaml
    # app/config/config.yml
    imports:
        - { resource: '@AcmeDemoBundle/Resources/config/services.xml' }

---

# More On The Service Container

### Tags

In the service container, a **tag** implies that the service is meant to be used
for a specific purpose.

    !yaml
    services:
        my_bundle.twig.foo:
            class: 'My\Bundle\Twig\FooExtension'
            tags:  { name: 'twig.extension' }

Twig finds all services tagged with `twig.extension` and automatically registers
them as extensions.

### Debugging Services

    !bash
    $ php app/console debug:container

    $ php app/console debug:container foo

> [http://symfony.com/doc/master/book/service_container.html](http://symfony.com/doc/master/book/service_container.html)
