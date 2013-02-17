# Symfony2

---

# What Is Symfony2?

First of all:

> Symfony2 is a **reusable** set of standalone, decoupled, and cohesive PHP
**components** that solve common web development problems.

Then, based on these components:

> Symfony2 is also a **full-stack web framework**.

_Fabien Potencier,
[http://fabien.potencier.org/article/49/what-is-symfony2](http://fabien.potencier.org/article/49/what-is-symfony2)._

---

# Requests In Symfony

    !php
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();

    // the URI being requested (e.g. /about) minus any query parameters
    $request->getPathInfo();

    // the HTTP verb
    $request->getMethod();

    // GET variables
    $request->query->get('foo');

    // POST variables
    $request->request->get('bar');

    // SERVER variables
    $request->server->get('HTTP_HOST');

    // retrieve an HTTP request header, with normalized, lowercase keys
    $request->headers->get('host');

---

# Responses In Symfony

    !php
    use Symfony\Component\HttpFoundation\Response;

    $response = new Response();

    $response->setContent(<<<HTML
    <html>
        <body>
            <h1>Hello world!</h1>
        </body>
    </html>
    HTML
    );

    $response->setStatusCode(200);

    $response->headers->set('Content-Type', 'text/html');

    // prints the HTTP headers followed by the content
    $response->send();

---

# The Simplest Front Controller Ever

    !php
    // index.php
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;

    $request = Request::createFromGlobals();
    $path    = $request->getPathInfo();

    if (in_array($path, array('', '/'))) {
        $response = new Response('Welcome to the homepage.');
    } elseif ($path == '/contact') {
        $response = new Response('Contact us');
    } else {
        $response = new Response('Page not found.', 404);
    }

    $response->send();

---

# The Symfony Application Flow

It's all about transforming a **request** into a **response**:

![](http://symfony.com/doc/current/_images/request-flow.png)

---

# Routing Definition

The routing system determines which PHP function should be executed based on
information from the request and routing configuration you've created.

    !yaml
    # app/config/routing.yml
    contact:
        pattern:  /contact
        defaults: { _controller: AcmeDemoBundle:Main:contact }

The `AcmeDemoBundle:Main:contact` string is a short syntax that points to a
specific PHP method named `contactAction()` inside a class called
`MainController`.

> **Note:** this example uses **YAML** to define the routing configuration.
> Routing configuration can also be written in other formats such as **XML** or
> **PHP**.

---

# Your First Controller

In Symfony2, a method in a controller is called an **action**. The convention is
to suffix each method with `Action`.

Also, each controller should be suffixed with `Controller`.

    !php
    // src/Acme/DemoBundle/Controller/MainController.php
    use Symfony\Component\HttpFoundation\Response;

    class MainController
    {
        public function contactAction()
        {
            return new Response('<h1>Contact us!</h1>');
        }
    }

---

# A Symfony2 Project

Recommended structure of a Symfony2 project:

    path/to/project/
        app/
            cache/
            config/
            logs/
        src/
            ...
        vendor/
            ...
        web/
            app.php
            ...

* `app/` contains the application kernel, and the configuration;
* `src/` contains your **bundles**;
* `vendor/` contains your dependencies;
* `web/` contains your front controllers and your assets.

---

# Application Kernel

This is the **central part** of your application:

    !php
    // app/AppKernel.php
    use Symfony\Component\HttpKernel\Kernel;

    class AppKernel extends Kernel
    {
        public function registerBundles()
        {
            $bundles = array(
                new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
                // ...
            );

            if (in_array($this->getEnvironment(), array('dev', 'test'))) {
                $bundles[] = // dev bundle;
            }

            return $bundles;
        }

        // ...
    }

---

# Application Configuration

An application consists of a collection of bundles representing all of the
features and capabilities of your application.

Each bundle can be customized via configuration files written in `YAML`, `XML`
or `PHP`.

By default, the main configuration file lives in the `app/config/`
directory and is called either `config.yml`, `config.xml` or `config.php`
depending on which format you prefer.

---

# YAML Configuration

    !yaml
    # app/config/config.yml
    imports:
        - { resource: parameters.yml }
        - { resource: security.yml }

    framework:
        secret: "%secret%"
        router: { resource: "%kernel.root_dir%/config/routing.yml" }
        # ...

    # Twig Configuration
    twig:
        debug:            "%kernel.debug%"
        strict_variables: "%kernel.debug%"

    # ...

---

# XML Configuration

    !xml
    <!-- app/config/config.xml -->
    <imports>
        <import resource="parameters.yml"/>
        <import resource="security.yml"/>
    </imports>

    <framework:config secret="%secret%">
        <framework:router resource="%kernel.root_dir%/config/routing.xml"/>
        <!-- ... -->
    </framework:config>

    <!-- Twig Configuration -->
    <twig:config debug="%kernel.debug%" strict-variables="%kernel.debug%"/>

    <!-- ... -->

---

# PHP Configuration

    !php
    $this->import('parameters.yml');
    $this->import('security.yml');

    $container->loadFromExtension('framework', array(
        'secret' => '%secret%',
        'router' => array(
            'resource' => '%kernel.root_dir%/config/routing.php'
        ),
        // ...
    ));

    // Twig Configuration
    $container->loadFromExtension('twig', array(
        'debug'            => '%kernel.debug%',
        'strict_variables' => '%kernel.debug%',
    ));

    // ...

---

# Configuration: The Rules

The **main configuration** has to be written in `YAML`:

    !yaml
    # app/config/config.yml
    # ...
    twig:
        debug:            "%kernel.debug%"
        strict_variables: "%kernel.debug%"

The **routing definition** has to be written in `YAML`:

    !yaml
    # app/config/routing.yml
    contact:
        pattern:  /contact
        defaults: { _controller: AcmeDemoBundle:Main:contact }

The **Dependency Injection Container configuration** has to be written in `XML`.

    !xml
    <services>
        <service id="acme_demo.controllers.main"
            class="Acme\DemoBundle\MainController" />
    </services>

---

# What Is A Bundle?

_A **Bundle** is a directory containing a set of files (PHP files, stylesheets,
JavaScripts, images, ...) that implement a **single feature** (a blog, a forum,
etc)._

It should be **reusable**, so that you don't reinvent the wheel each time you
need a common feature. In Symfony2, (almost) everything lives inside a bundle.

In order to use a bundle in your application, you need to register it in the
`AppKernel`, using the `registerBundles()` method:

    !php
    public function registerBundles()
    {
        $bundles = array(
            // ...

            new My\AwesomeBundle\MyAwesomeBundle(),
        );

        // ...
    }

---

# Bundle: Directory Structure

Recommended structure for a bundle:

    XXX/...
        HelloBundle/
            HelloBundle.php
            Controller/
            Resources/
                meta/
                    LICENSE
                config/
                doc/
                    index.rst
                translations/
                views/
                public/
            Tests/

The `HelloBundle` class is mandatory, and both `Resources/meta/LICENSE` and
`Resources/doc/index.rst` files should be present.

The `XXX` directory(ies) reflects the namespace structure of the bundle.

---

# Bundle: Where To Put Your Classes?

<table>
    <colgroup>
        <col width="51%">
        <col width="49%">
    </colgroup>
    <thead valign="bottom">
        <tr>
            <th class="head">Type</th>
            <th class="head">Directory</th>
        </tr>
    </thead>
    <tbody valign="top">
        <tr>
            <td>Commands</td>
            <td><tt><code>Command/</code></tt></td>
        </tr>
        <tr>
            <td>Controllers</td>
            <td><tt><code>Controller/</code></tt></td>
        </tr>
        <tr>
            <td>Service Container Extensions</td>
            <td><tt><code>DependencyInjection/</code></tt></td>
        </tr>
        <tr>
            <td>Event Listeners</td>
            <td><tt><code>EventListener/</code></tt></td>
        </tr>
        <tr>
            <td>Configuration</td>
            <td><tt><code>Resources/config/</code></tt></td>
        </tr>
        <tr>
            <td>Web Resources</td>
            <td><tt><code>Resources/public/</code></tt></td>
        </tr>
        <tr>
            <td>Translation files</td>
            <td><tt><code>Resources/translations/</code></tt></td>
        </tr>
        <tr>
            <td>Templates</td>
            <td><tt><code>Resources/views/</code></tt></td>
        </tr>
        <tr>
            <td>Unit and Functional Tests</td>
            <td><tt><code>Tests/</code></tt></td>
        </tr>
    </tbody>
</table>

---

# Creating a Bundle

A **bundle** has to extend the `Symfony\Component\HttpKernel\Bundle\Bundle`
class:

    !php
    // src/Acme/MyFirstBundle/AcmeMyFirstBundle.php
    namespace Acme\MyFirstBundle;

    use Symfony\Component\HttpKernel\Bundle\Bundle;

    class AcmeMyFirstBundle extends Bundle
    {
    }

You can register your bundle:

    !php
    // app/AppKernel.php
    public function registerBundles()
    {
        $bundles = array(
            new Acme\MyFirstBundle\AcmeMyFirstBundle(),
        );

        return $bundles;
    }

---

# The Web Directory

The web root directory is the **home of all public and static files** including
images, stylesheets, and JavaScript files. It is also where each front
controller lives:

    !php
    // web/app.php
    require_once __DIR__.'/../app/bootstrap.php.cache';
    require_once __DIR__.'/../app/AppKernel.php';

    use Symfony\Component\HttpFoundation\Request;

    $kernel   = new AppKernel('prod', false);
    $request  = Request::createFromGlobals();
    $response = $kernel->handle($request);
    $response->send();

The front controller file (`app.php` in this example) is the actual PHP file
that's executed when using a Symfony2 application and its job is to use a Kernel
class, `AppKernel`, to bootstrap the application.
