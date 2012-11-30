# Model View Controller

---

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


