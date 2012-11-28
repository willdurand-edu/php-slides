# The PHP Syntax

---

# Primitive Types

4 **scalar** types: `boolean`, `integer`, `float`, `string`;

2 **compound** types: `array`, `object`;

2 **special** types: `resource`, `null`;

And 3 **pseudo** types: `mixed`, `number`, `callback`.

**Note:** most of these types have aliases. E.g. `double` for `float`.

> Read more about the **PHP primitive types**:
[http://www.php.net/manual/en/language.types.intro.php](http://www.php.net/manual/en/language.types.intro.php).

---

# Comparison Operators

    !php
    $a = 5;

    // compare value; return true
    var_dump($a == 5);

    // compare value (ignore type); return true
    var_dump($a == '5');

    // compare type/value (integer vs. integer); return true
    var_dump($a === 5);

    // compare type/value (integer vs. string); return false
    var_dump($a === '5');

> Read more about **comparison operators**:
[http://php.net/manual/en/language.operators.comparison.php](http://php.net/manual/en/language.operators.comparison.php).

---

# Classes

### Simple class definition

    !php
    class Foo
    {
    }

**Important:** No class-level visibility in PHP.

### Abstract class definition

    !php
    abstract class AbstractFoo
    {
        abstract public function doSomething();
    }

---

# Visibility

3 keywords:

* `public`
* `protected`
* `private`

Attribute visibility must be set.

Method visibility **should** be set.

Methods without any explicit visibility keyword are defined as `public`.

---

# Attributes

    !php
    class Foo
    {
        /**
         * @var int
         */
        public static $count = 0;

        /**
         * @var Iterator
         */
        public $iterator;

        /**
         * @var array
         */
        protected $values = array();

        /**
         * @var string|null
         */
        private $language = null;
    }

---

# Methods

    !php
    class Foo
    {
        public function doSomething()
        {
        }
    }

### Type Hinting

Works with objects, interfaces, arrays or `callable`. You can't use
scalar types such as `int` or `string`:

    !php
    public function doSomething(Foo $foo);

    public function doSomething(Traversable $iterator);

    public function doSomething(array $values);

    public function doSomething(callable $callback);

---

# Interfaces

### Simple interface definition

    !php
    interface Fooable
    {
        const VALUE = 123;

        // it's always public anyway
        public function doSomething();
    }

### Inheritance

    !php
    interface MyTraversable extends extends Traversable
    {
    }

### Usage

    !php
    class Foo implements Fooable, MyTraversable {}

---

# Namespaces

Namespaces prevent naming collisions with identifiers such as function, class,
and interface names:

    !php
    namespace Vendor\Model;
    // ...

Or:

    !php
    namespace MyNamespace {
        // ...
    }

### PSR-0

[PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md)
describes a set of rules related to namespaces for autoloader interoperability.

    !php
    \ns\package\Class_Name      => vendor/ns/package/Class/Name.php
    \ns\package_name\Class_Name => vendor/ns/package_name/Class/Name.php

---

# Traits

Horizontal Inheritance FTW!

    !php
    trait Hello                         trait World
    {                                   {
        public function sayHello()          public function sayWorld()
        {                                    {
            echo 'Hello ';                       echo 'World';
        }                                    }
    }                                   }

    class MyHelloWorld
    {
        use Hello, World;
    }

    $obj = new MyHelloWorld();
    $obj->sayHello();
    $obj->sayWorld();


> Read more about **traits**:
[http://www.php.net/manual/en/language.oop5.traits.php](http://www.php.net/manual/en/language.oop5.traits.php).

---

# Anonymous Functions

    !php
    $greet = function ($name) {
        printf("Hello %s\n", $name);
    };

    $greet('World');
    => Hello World

> Read more about **anonymous functions**:
[http://www.php.net/manual/en/functions.anonymous.php](http://www.php.net/manual/en/functions.anonymous.php).

---

# Closures

    !php
    $fibonacci = function ($n) use (&$fibonacci) {
        if (0 === $n || 1 === $n) {
            return 1;
        }

        return $fibonacci($n - 1) + $fibonacci($n - 2);
    };

    echo (int) $fibonacci(6);
    => 13

> Read more about **closures**:
[http://php.net/manual/en/class.closure.php](http://php.net/manual/en/class.closure.php).

---

# Magic Methods

Starts with `__`.

Two useful methods:

    !php
    __construct() { /* ... */ }

and:

    !php
    __toString() { /* ... */ }

Other methods are not really useful but it's worth knowing them.

> Read more about **magic methods**:
[http://php.net/manual/en/language.oop5.magic.php](http://php.net/manual/en/language.oop5.magic.php).

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

> Read more about **coding standards** with [PSR-1](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-1-basic-coding-standard.md) and
[PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).

