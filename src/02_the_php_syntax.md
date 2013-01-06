# The PHP Syntax

---

# Primitive Types

4 **scalar** types: `boolean`, `integer`, `float`, `string`;

2 **compound** types: `array`, `object`;

2 **special** types: `resource`, `null`;

And 3 **pseudo** types: `mixed`, `number`, `callable`.

**Note:** most of these types have aliases. E.g. `double` for `float`.

> Read more about the **PHP primitive types**:
[http://www.php.net/manual/en/language.types.intro.php](http://www.php.net/manual/en/language.types.intro.php).

---

# Comparison Operators

    !php
    // so, this is a PHP variable
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

# Operators

    !php
    $a++; // or: ++$a;

    $b--; // or: --$b;

    $a && $b;   // AND
    $a || $b;   // OR

    ! $a;       // `true` if $a is not `true`

    $a . 'foo'; // concatenation

But also:

    !php
    $a  = 'foo';
    $a .= 'bar';
    // $a => 'foobar'

    $b  = 0;
    $b += 1;    // $b = 1
    $b -= 1;    // $b = 0

---

# Classes (1/2)

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

# Classes (2/2)

Creating an instance:

    !php
    $foo = new Foo();
    // $foo = new Foo;

    // can also be done with a variable
    $class = 'Foo';
    $foo   = new $class();

Getting the classname of an instance:

    !php
    echo get_class($foo);
    => Foo

Useful keyword: `instanceof`

    !php
    if ($foo instanceof Foo) {
        // do something
    }

> [http://www.php.net/manual/en/language.oop5.basic.php](http://www.php.net/manual/en/language.oop5.basic.php)

---

# Visibility

### Keywords

* `public`
* `protected`
* `private`


### The Rules

Attribute visibility MUST be set.

Method visibility SHOULD be set.

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

# Methods (1/3)

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

# Methods (2/3)

The `->` sign is used to call methods on objects.

### Usage

    !php
    $foo->doSomething();

    // >= PHP 5.4
    (new Foo())->doSomething();

    // can also be done with a variable
    $method = 'doSomething';
    $foo->$method();

    $foo->{$method . 'Else'}();
    // will call 'doSomethingElse()'

---

# Methods (3/3)

    !php
    public function doSomething()
    {
        // method call
        $this->doSomethingElse();

        // parent method call (inheritance)
        parent::doSomething();

        // accessing a constant
        self::VALUE;

        // accessing a constant from another class
        Bar::ANOTHER_VALUE;

        // accessing an attribute
        return $this->attribute;
    }

---

# Static Keyword (1/2)

Attributes/Methods can be defined as `static`:

    !php
    class Foo
    {
        public static $value;

        public static function doThings()
        {
            // accessing a static attribute
            // don't forget the dollar sign!
            self::$value;
        }
    }

**Warning:** the `static` keyword can also be used to
[define static variables](http://www.php.net/manual/en/language.variables.scope.php#language.variables.scope.static) and for [late static bindings](http://www.php.net/manual/en/language.oop5.late-static-bindings.php).
This is different!

---

# Static Keyword (2/2)

### Usage

    !php
    $foo = new Foo();

    // accessing the attribute from an instance
    $foo::$value = 123;

    // accessing the attribute directly from the class
    echo Foo::value;
    => 123

> [http://php.net/manual/en/language.oop5.static.php](http://php.net/manual/en/language.oop5.static.php)

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
    interface MyTraversable extends Traversable
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

Other methods are not really useful but it's worth knowing them (`__get()`, `__set()`).

> Read more about **magic methods**:
[http://php.net/manual/en/language.oop5.magic.php](http://php.net/manual/en/language.oop5.magic.php).
