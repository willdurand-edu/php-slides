# Templating

---

# ![](../images/twig_homepage.png)

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

* `{{ ... }}`: prints a variable or the result of an expression;
* `{% ... %}`: controls the logic of the template; it is used to execute for
  loops and if statements, for example;
* `{# ... #}`: comments.


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

The result with _two_ users would be:

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
(`::base.html.twig`) that indicates that the template lives in the
`app/Resources/views`.

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

Symfony2 uses a `bundle:controller:template` string syntax for templates.

You can skip the `controller` string: `bundle::controller:template`. The `template`
file would live in `Resources/views/`.

You can also skip the `bundle` string. It refers to an application-wide base
template or layout. This means that the template is not located in any bundle,
but instead in the root `app/Resources/views/` directory.

---

# Template Naming and Locations (2/2)

### Example

    AcmeBlogBundle:Blog:index.html.twig

`AcmeBlogBundle`: (bundle) the template lives inside the `AcmeBlogBundle` (e.g.
`src/Acme/BlogBundle`).

`Blog`: (controller) indicates that the template lives inside the `Blog`
subdirectory of `Resources/views`.

`index.html.twig`: (template) the actual name of the file is `index.html.twig`.

Assuming that the `AcmeBlogBundle` lives at `src/Acme/BlogBundle`, the final
path to the layout would be:

    src/Acme/BlogBundle/Resources/views/Blog/index.html.twig

---


