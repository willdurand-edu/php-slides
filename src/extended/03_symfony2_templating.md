# Templating

---

# ![](../images/twig_homepage.png)

.fx: no-border

---

# Why Twig?

**Fast**, **Secure**, **Flexible**.

#### Before

    !php
    <ul id="navigation">
        <?php foreach ($navigation as $item): ?>
            <li>
                <a href="<?php echo $item->getHref() ?>">
                    <?php echo $item->getCaption() ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>

#### After

    !jinja
    <ul id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
    </ul>

---

# Getting Familiar With Twig

### Delimiters

* `{{ ... }}`: prints a **variable** or the result of an expression;
* `{% ... %}`: controls the **logic** of the template; it is used to execute for
  loops and if statements, for example;
* `{# ... #}`: **comments**.

> [http://twig.sensiolabs.org/](http://twig.sensiolabs.org/)

---

# Accessing Variables

    !jinja
    {# array('name' => 'Fabien') #}
    {{ name }}

    {# array('user' => array('name' => 'Fabien')) #}
    {{ user.name }}

    {# force array lookup #}
    {{ user['name'] }}

    {# array('user' => new User('Fabien')) #}
    {{ user.name }}
    {{ user.getName }}

    {# force method name lookup #}
    {{ user.name() }}
    {{ user.getName() }}

    {# pass arguments to a method #}
    {{ user.date('Y-m-d') }}

---

# Control Structure

### Conditions

    !jinja
    {% if user.isSuperAdmin() %}
        ...
    {% elseif user.isMember() %}
        ...
    {% else %}
        ...
    {% endif %}

### Loops

    !jinja
    <ul>
        {% for user in users if user.active %}
            <li>{{ user.username }}</li>
        {% else %}
            <li>No users found</li>
        {% endfor %}
    </ul>

---

# Filters

Filters are used to modify Twig variables.

You can use **inline filters** by using the `|` symbol:

    !jinja
    {{ 'hello'|upper }}

But you can also use the **block syntax**:

    !jinja
    {% filter upper %}
        hello
    {% endfilter %}

Filters can be parametrized:

    !jinja
    {{ post.createdAt|date('Y-m-d') }}

> [http://twig.sensiolabs.org/doc/filters/index.html](http://twig.sensiolabs.org/doc/filters/index.html)


---

# Including Other Templates

The `include` tag is useful to include a template and return the rendered
content of that template into the current one:

    !jinja
    {% include 'sidebar.html' %}

### Example

Given the following template:

    !jinja
    {% for user in users %}
        {% include "render_user.html" %}
    {% endfor %}

with `render_user.html`:

    !jinja
    <p>{{ user.username }}</p>

<p></p>

    !html
    <p>William D.</p>
    <p>Julien M.</p>

---

# Template Inheritance (1/2)

Let's define a base template, `base.html`, which defines a simple HTML skeleton:

    !jinja
    {# app/Resources/views/base.html.twig #}
    <!DOCTYPE html>
    <html>
        <head>
            <title>{% block title %}Test Application{% endblock %}</title>
        </head>
        <body>
            <div id="sidebar">
                {% block sidebar %}
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/blog">Blog</a></li>
                </ul>
                {% endblock %}
            </div>

            <div id="content">
                {% block body %}{% endblock %}
            </div>
        </body>
    </html>

---

# Template Inheritance (2/2)

The key to template inheritance is the `{% extends %}` tag.

A **child template** might look like this:

    !jinja
    {# src/Acme/BlogBundle/Resources/views/Blog/index.html.twig #}
    {% extends '::base.html.twig' %}

    {% block title %}My cool blog posts{% endblock %}

    {% block body %}
        {% for entry in blog_entries %}
            <h2>{{ entry.title }}</h2>
            <p>{{ entry.body }}</p>
        {% endfor %}
    {% endblock %}

The **parent template** is identified by a special string syntax
(`::base.html.twig`) which indicates that the template lives in
`app/Resources/views/`.

If you need to get the content of a block from the **parent template**, you can
use the `{{ parent() }}` function.

---

# Template Naming and Locations (1/2)

By default, templates can live in two different locations:

* `app/Resources/views/`: The applications views directory can contain
  application-wide **base templates** (i.e. your application's layouts) as well as
  **templates that override bundle templates**;
* `path/to/bundle/Resources/views/`: Each **bundle houses its templates** in its
  `Resources/views` directory (and subdirectories).

Symfony uses a `bundle:controller:template` string syntax for templates.

You can skip the `controller` string: `bundle::template`. The `template`
file would live in `Resources/views/`.

You can also skip the `bundle` string. It refers to an application-wide base
template or layout. This means that the template is not located in any bundle,
but instead in the root `app/Resources/views/` directory.

---

# Template Naming and Locations (2/2)

### Example

    !text
    AcmeBlogBundle:Blog:index.html.twig

* `AcmeBlogBundle`: (bundle) the template lives inside the `AcmeBlogBundle` (e.g.
`src/Acme/BlogBundle`);
* `Blog`: (controller) indicates that the template lives inside the `Blog`
subdirectory of `Resources/views`;
* `index.html.twig`: (template) the actual name of the file is `index.html.twig`.

Assuming that the `AcmeBlogBundle` lives at `src/Acme/BlogBundle`, the final
path to the layout would be:

    !text
    src/Acme/BlogBundle/Resources/views/Blog/index.html.twig

---

# Overriding Bundle Templates

Once you use a third-party bundle, you'll likely need to override and customize
one or more of its templates.

When the `FooBarBundle:Bar:index.html.twig` is rendered, Symfony actually
looks in two different locations for the template:

* `app/Resources/FooBarBundle/views/Bar/index.html.twig`;
* `src/Foo/BarBundle/Resources/views/Bar/index.html.twig`.

In order to  override the bundle template, copy the `index.html.twig` template
from the bundle to: `app/Resources/FooBarBundle/views/Bar/index.html.twig`.

---

# Overriding Core Templates

The core **TwigBundle** contains a number of different templates that can be
overridden by copying each from the `Resources/views/` directory of the
**TwigBundle** to the `app/Resources/TwigBundle/views/` directory.

---

# The Three-Level Approach

1. Create a `app/Resources/views/base.html.twig` file that contains the **main
layout** for your application (like in the previous example). Internally, this
template is called `::base.html.twig`.

2. Create a template for each **section** of your site. The _AcmeBlogBundle_
would have a template called `AcmeBlogBundle::layout.html.twig` that contains
only blog section-specific elements.

3. Create **individual templates for each page** and make each extend the
appropriate section template. For example, the "index" page would be called
something close to `AcmeBlogBundle:Blog:index.html.twig` and list the actual
blog posts.

---

# Twig Into Symfony

---

# Rendering A Template

### Using The Base Controller

    !php
    public function listAction()
    {
        // ...

        return $this->render('AcmeBlogBundle:Blog:index.html.twig', array(
            'posts' => $posts,
        ));
    }

### Using the Templating Service

    !php
    $engine  = $this->container->get('templating');
    $content = $engine->render('AcmeBlogBundle:Blog:index.html.twig', array(
        'posts' => $posts,
    ));

    return new Response($content);

---

# Linking to Pages

Assuming the following routing definition:

    !yaml
    homepage:
        path:     /
        defaults: { _controller: AcmeDemoBundle:Hello:index }

    acme_blog.post_show:
        path:     /posts/{slug}
        defaults: { _controller: AcmeBlogBundle:Post:show }

You can create a **relative URL** using `path()`:

    !jinja
    <a href="{{ path('homepage') }}">Home</a>

You can create an **absolute URL** using `url()`:

    !jinja
    <a href="{{ url('homepage') }}">Home</a>

The second argument is used to pass parameters:

    !jinja
    <a href="{{ path('acme_blog.post_show', {'slug': 'my-super-slug'}) }}">

---

# Linking to Assets

    !jinja
    <script src={{ asset('js/script.js') }}></script>

    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <img src="{{ asset('images/logo.png') }}" alt="Symfony!" />

### Cache Busting

**Cache busting** is the process of **forcing browsers** or proxy servers **to
update their cache**, for instance, JavaScript and CSS files or images.

    !yaml
    # app/config/config.yml
    framework:
        # ...
        templating: { engines: ['twig'], assets_version: v2 }

The `asset_version` parameter is used to **bust the cache on assets** by globally
adding a query parameter to all rendered asset paths:

    !text
    /images/logo.png?v2

---

# Linking To Pages In JavaScript

The [FOSJsRoutingBundle](https://github.com/FriendsOfSymfony/FOSJsRoutingBundle)
allows you to **expose your routing in your JavaScript code**. That means you'll
be able to generate URL with given parameters like you can do with the _Router_
component provided by Symfony.

    !yaml
    # app/config/routing.yml
    my_route_to_expose:
        pattern:  /foo/{id}/bar
        defaults: { _controller: FooBarBundle:Foo:bar }
        options:
            expose: true

According to the routing definition above, you can write the following
JavaScript code to generate URLs:

    !javascript
    Routing.generate('my_route_to_expose', { id: 10 });
    // /foo/10/bar

    Routing.generate('my_route_to_expose', { id: 10 }, true);
    // http://example.org/foo/10/bar

---

# Global Template Variables

* `app.security`: the **security** context;
* `app.user`: the **current user** object;
* `app.request`: the **request** object;
* `app.session`: the **session** object;
* `app.environment`: the current environment (`dev`, `prod`, etc);
* `app.debug`: `true` if in debug mode. `false` otherwise.
