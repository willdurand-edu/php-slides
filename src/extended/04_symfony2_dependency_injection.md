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
            $this->bar   = $bar;
            $this->debug = $debug;
        }
    }

The **service definition** for the class described above is:

    !xml
    <services>
        <service id="foo" class="My\Bundle\Foo" />
    </services>

This service is now available in the container, and you can access it by
**asking** the service from the container:

    !php
    $foo = $this->container->get('foo');

---

# Service Parameters

The service definition described before is not flexible enough. For instance,
`$debug` argument is never configured.

**Parameters** make defining services more **organized** and **flexible**:

    !xml
    <parameters>
        <parameter key="my_bundle.foo.class">My\Bundle\Foo</parameter>
    </parameters>

    <services>
        <service id="foo" class="%my_bundle.foo.class%">
            <argument></argument> <!-- null -->
            <argument>%kernel.debug%</argument>
        </service>
    </services>

In the definition above, `kernel.debug` is a parameter defined by the framework
itself. The `foo` service is now **parametrized**.

Also, it becomes easy to change the implementation of this service by simply
overriding the `my_bundle.foo.class` parameter.

---

# Injecting Services

As you may noticed, the `Foo` class takes an instance of `Bar` as first
argument. You can **inject** this instance in your `foo` service by
**referencing** the `bar` service:

    !xml
    <parameters>
        <parameter key="my_bundle.foo.class">My\Bundle\Foo</parameter>
        <parameter key="my_bundle.bar.class">My\Bundle\Bar</parameter>
    </parameters>

    <services>
        <service id="bar" class="%my_bundle.bar.class%" />

        <service id="foo" class="%my_bundle.foo.class%">
            <argument type="service" id="bar" />
            <argument>%kernel.debug%</argument>
        </service>
    </services>

### Optional Dependencies: Setter Injection

    !xml
    <call method="setBar">
        <argument type="service" id="bar" />
    </call>

---

# Importing Configuration Resources

### The `imports` Way

    !yaml
    # app/config/config.yml
    imports:
        - { resource: "@AcmeDemoBundle/Resources/config/services.xml" }

### Container Extensions

A **service container extension** is a PHP class to accomplish two things:

* **import** all service container resources needed to configure the services for
  the bundle;
* **provide semantic**, straightforward **configuration** so that the bundle can
  be configured without interacting with the flat parameters of the bundle's
  service container configuration.

---

# Creating an Extension Class

An extension class should live in the `DependencyInjection` directory of your
bundle and its name should be constructed by replacing the `Bundle` suffix of
the Bundle class name with `Extension`.

    !php
    // Acme/DemoBundle/DependencyInjection/AcmeDemoExtension.php
    namespace Acme\DemoBundle\DependencyInjection;

    use Symfony\Component\Config\FileLocator;
    use Symfony\Component\DependencyInjection\ContainerBuilder;
    use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
    use Symfony\Component\HttpKernel\DependencyInjection\Extension;

    class AcmeDemoExtension extends Extension
    {
        public function load(array $configs, ContainerBuilder $container)
        {
            $loader = new XmlFileLoader($container, new FileLocator(
                __DIR__ . '/../Resources/config'
            ));
            $loader->load('services.xml');
        }
    }

---

# Dealing With Configuration (1/2)

The presence of the previous class means that you can now define an
`acme_demo` configuration namespace in any configuration file:

    !yaml
    # app/config/config.yml
    acme_demo: ~

Take the following configuration:

    !yaml
    acme_demo:
        foo: fooValue
        bar: barValue

The array passed to your `load()` method will look like this:

    !php
    array(
        array(
            'foo' => 'fooValue',
            'bar' => 'barValue',
        )
    )

---

# Dealing With Configuration (2/2)

The `$configs` argument is an **array of arrays**, not just a single flat array
of the configuration values.

It's your job to decide how these configurations should be merged together.

You might, for example, have later values override previous values or
somehow merge them together:

    !php
    public function load(array $configs, ContainerBuilder $container)
    {
        $config = array();
        foreach ($configs as $subConfig) {
            $config = array_merge($config, $subConfig);
        }

        // ... now use the flat $config array
    }


---

# The Configuration Class (1/2)

### Definition

    !php
    // src/Acme/DemoBundle/DependencyInjection/Configuration.php
    namespace Acme\DemoBundle\DependencyInjection;

    use Symfony\Component\Config\Definition\Builder\TreeBuilder;
    use Symfony\Component\Config\Definition\ConfigurationInterface;

    class Configuration implements ConfigurationInterface
    {
        public function getConfigTreeBuilder()
        {
            $treeBuilder = new TreeBuilder();
            $rootNode    = $treeBuilder->root('acme_demo');

            $rootNode
                ->children()
                    ->scalarNode('my_type')->defaultValue('bar')->end()
                ->end();

            return $treeBuilder;
        }
    }

---

# The Configuration Class (2/2)

### Usage

    !php
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();

        $config = $this->processConfiguration($configuration, $configs);

        // ...
    }

The `processConfiguration()` method uses the **configuration tree** you've defined
in the `Configuration` class to **validate**, **normalize** and **merge** all of
the configuration arrays together.

> Read more on How to expose a Semantic Configuration for a Bundle:
[http://symfony.com/doc/master/cookbook/bundles/extension.html](http://symfony.com/doc/master/cookbook/bundles/extension.html).

---

# More On The Service Container

### Tags

In the service container, a **tag** implies that the service is meant to be used
for a specific purpose.

    !xml
    <service id="my_bundle.twig.foo" class="My\Bundle\Twig\FooExtension">
        <tag name="twig.extension" />
    </service>

Twig finds all services tagged with `twig.extension` and automatically registers
them as extensions.

### Debugging Services

    !bash
    $ php app/console container:debug

    $ php app/console container:debug foo

> [http://symfony.com/doc/master/book/service_container.html](http://symfony.com/doc/master/book/service_container.html)
