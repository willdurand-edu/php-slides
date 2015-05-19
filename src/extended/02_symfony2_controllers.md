# Controllers

---

# Request, Controller, Response

A controller is a **PHP function** you create that takes information from the
**HTTP request** and constructs and returns an **HTTP response**.

Every request handled by a Symfony project goes through the same lifecycle:

1. Each request is handled by a single front controller file (e.g. `app.php` or
`app_dev.php`) that bootstraps the application;
2. The **Router** reads information from the request (e.g. the URI), finds a route
that matches that information, and reads the `_controller` parameter from the
route;
3. The **controller** from the matched route is executed and the code inside the
controller creates and returns a `Response` object;
4. The HTTP headers and content of the `Response` object are sent back to the
client.

---

# The Simplest Page Ever

### Routing Definition

    !yaml
    # app/config/routing.yml
    homepage:
        pattern:  /
        defaults: { _controller: AcmeDemoBundle:Hello:index }

### Controller Implementation

    !php
    // src/Acme/DemoBundle/Controller/HelloController.php
    namespace Acme\DemoBundle\Controller;

    use Symfony\Component\HttpFoundation\Response;

    class HelloController
    {
        public function indexAction()
        {
            return new Response('Home, Sweet Home!');
        }
    }

---

# Controller Naming Pattern

Every route must have a `_controller` parameter, which dictates **which controller
should be executed when that route is matched**.

This parameter uses a simple string pattern called the **logical controller name**.
The pattern has three parts, each separated by a colon:

    bundle:controller:action

For example, a `_controller` value of `AcmeBlogBundle:Blog:show` means:

* Bundle: `AcmeBlogBundle`;
* Controller Class: `BlogController`;
* Method Name: `showAction`.

Notice that Symfony adds the string `Controller` to the class name (`Blog` =>
`BlogController`) and `Action` to the method name (`show` => `showAction`).

---

# Route Params as Controller Args

### Routing Definition

    !yaml
    # src/Acme/DemoBundle/Resources/config/routing.yml
    acme_demo.hello_hello:
        pattern:  /hello/{name}
        defaults: { _controller: AcmeDemoBundle:Hello:hello }
        requirements:
            _method: GET


### Controller Implementation

    !php
    // src/Acme/DemoBundle/Controller/HelloController.php

    class HelloController
    {
        // ...

        public function helloAction($name)
        {
            return new Response(sprintf('Home, Sweet %s!', $name));
        }
    }

---

# The Request as a Controller Argument

For convenience, you can also have Symfony pass you the Request object as an
argument to your controller:

    !php
    use Symfony\Component\HttpFoundation\Request;

    class HelloController
    {
        // ...

        public function updateAction(Request $request)
        {
            // do something useful with $request
        }
    }

This is useful when you are working with forms.

---

# The Base Controller Class

Symfony comes with a base `Controller` class that assists with some of the most
common controller tasks and gives your controller class access to any resource
it might need:

    !php
    use Symfony\Bundle\FrameworkBundle\Controller\Controller

    class HelloController extends Controller
    {
        // ...
    }

### Redirecting

    !php
    $this->redirect($this->generateUrl('homepage'));


### Rendering Templates

    !php
    return $this->render(
        'AcmeDemoBundle:Hello:hello.html.twig', array('name' => $name)
    );

---

# The Response

The only **requirement** for a controller is to return a `Response` object.

Create a simple `Response` with a `200` status code:

    !php
    use Symfony\Component\HttpFoundation\Response;

    $response = new Response('Hello, ' . $name, 200);

Create a JSON response with a `200` status code:

    !php
    $response = new Response(json_encode(array('name' => $name)));
    $response->headers->set('Content-Type', 'application/json');

Or:

    !php
    use Symfony\Component\HttpFoundation\JsonResponse;

    $response = new JsonResponse(array('name' => $name));

---

# Routing

---

# Basic Route Configuration

The Symfony router lets you define URLs that you map to different areas of
your application.

A _route_ is a map from a URL path to a controller. Each route is named, and
maps a `pattern` (or `path` as of Symfony.2) to a `_controller`:

    !yaml
    # app/config/routing.yml
    homepage:
        pattern:  /
        defaults: { _controller: AcmeDemoBundle:Hello:index }

This route matches the homepage (`/`) and maps it to the
`AcmeDemoBundle:Hello:index` controller.

> [http://symfony.com/doc/master/book/routing.html](http://symfony.com/doc/master/book/routing.html)

---

# Routing with Placeholders (1/2)

### Required Placeholders

    !yaml
    blog:
        path:      /blog/{page}
        defaults:  { _controller: AcmeBlogBundle:Blog:index }

The path will match anything that looks like `/blog/*`.

Even better, the value matching the `{page}` **placeholder** will be available
inside your controller.

`/blog` will **not** match.

---

# Routing with Placeholders (2/2)

### Optional Placeholders

    !yaml
    blog:
        path:      /blog/{page}
        defaults:  { _controller: AcmeBlogBundle:Blog:index, page: 1 }

By adding `page` to the **defaults** key, `{page}` is **no longer required**.

`/blog` will match this route and the value of the `page` parameter will be
set to `1`. `/blog/2` will also match, giving the `page` parameter a value of `2`.

---

# Requirements

    !yaml
    blog:
        path:      /blog/{page}
        defaults:  { _controller: AcmeBlogBundle:Blog:index, page: 1 }
        requirements:
            page:  \d+

The `\d+` requirement is a **regular expression** that says that the value of
the `{page}` parameter must be a digit (i.e. a number).

### HTTP Method Requirements

    !yaml
    # src/Acme/DemoBundle/Resources/config/routing.yml
    acme_demo.hello_hello:
        pattern:  /hello/{name}
        defaults: { _controller: AcmeDemoBundle:Hello:hello }
        methods:  [ GET ]
        # methods:  [ GET, POST ]

---

# Including External Routing Resources

All routes are loaded via a single configuration file, most of the time it will
be `app/config/routing.yml`.

In order to respect the "bundle" principle, the routing configuration should be
located in the bundle itself, and you should just require it:

    !yaml
    # app/config/routing.yml
    acme_demo:
        resource: "@AcmeDemoBundle/Resources/config/routing.yml"


### Prefixing Imported Routes

    !yaml
    # app/config/routing.yml
    acme_demo:
        resource: "@AcmeDemoBundle/Resources/config/routing.yml"
        prefix: /demo

The string `/demo` now be prepended to the path of each route loaded from
the new routing resource.

---

# Generating URLs

The `Router` is able to generate both relative and absolute URLs.

    !php
    $router = $this->get('router');

### Relative URLs

    !php
    $router->generate('acme_demo.hello_hello', [ 'name' => 'will' ]);
    // /hello/will

### Absolute URLs

    !php
    $router->generate('acme_demo.hello_hello', [ 'name' => 'will' ], true);
    // http://example.com/hello/will

### Query String

    !php
    $router->generate('acme_demo.hello_hello', [
        'name' => 'will', 'some' => 'thing'
    ]);
    // /hello/will?some=thing
