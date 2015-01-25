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

### Timing Attack Safe String Comparison

The [`hash_equals()`](http://php.net/manual/en/function.hash-equals.php)
function has been added in PHP 5.6 to compare two strings in constant time.

---

# Operators

    !php
    $a++; // or: ++$a;

    $b--; // or: --$b;

    $a && $b;   // AND
    $a || $b;   // OR

    ! $a;       // `true` if $a is not `true`

    $a . 'foo'; // concatenation

    2 ** 3 = 8 // exponentiation (PHP 5.6+)

But also:

    !php
    $a  = 'foo';
    $a .= 'bar';
    // $a => 'foobar'

    $b  = 0;
    $b += 1;    // $b = 1
    $b -= 1;    // $b = 0

    $c = 2;
    $c **= 3;   // $c = 8

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

# Properties

    !php
    class Foo
    {
        const VALUE = 123;
        // PHP 5.6+
        const SENTENCE        = 'The value of VALUE is ' . self::VALUE;
        const ARRAY_OF_VALUES = ['a', 'b'];

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

Works with classes, interfaces, arrays, `callable`, and `Closure`. You can't use
scalar types such as `int` or `string`:

    !php
    public function doSomething(Foo $foo);

    public function doSomething(Traversable $iterator);

    public function doSomething(array $values);

    public function doSomething(callable $callback);

    public function doSomething(Closure $closure);

---

# Methods (2/3)

The `->` operator is used to call methods on objects.

### Usage

    !php
    $foo = new Foo();
    $foo->doSomething();

    // >= PHP 5.4
    (new Foo())->doSomething();

    // can also be done with a variable
    $method = 'doSomething';
    $foo->$method();

    $foo->{$method . 'Else'}();
    // will call 'doSomethingElse()'; curly braces are required.

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

# Static Keyword

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

**Warning:** the `static` keyword can also be used to [define static
variables](http://www.php.net/manual/en/language.variables.scope.php#language.variables.scope.static)
and for [late static
bindings](http://www.php.net/manual/en/language.oop5.late-static-bindings.php).
This is different!

---

# Late Static Bindings

    !php
    class A
    {
        public static function who() { echo __CLASS__; }

        public static function testSelf()
        {
            self::who();
        }

        public static function testStatic()
        {
            static::who();
        }
    }

    class B extends A
    {
        public static function who() { echo __CLASS__; }
    }

<p></p>

    !php
    B::testSelf();
    // A

    B::testStatic();
    // B

---

# Static Keyword

### Usage

    !php
    $foo = new Foo();

    // accessing the attribute from an instance
    $foo::$value = 123;

    // accessing the attribute directly from the class
    echo Foo::$value;
    => 123

> Read more:
[http://php.net/manual/en/language.oop5.static.php](http://php.net/manual/en/language.oop5.static.php).

---

# Variadic Functions

New operator `...` as of PHP 5.6:

    !php
    function sum(...$numbers)
    {
        return array_sum($numbers);
    }

    echo sum(1, 2);
    // 3

### Argument Unpacking

    !php
    $numbers = [ 2, 3 ];
    echo sum(1, ...$numbers);
    // 6

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
    // Interface may extend several other interfaces.
    // This is not possible with class though!
    interface MyTraversable extends Traversable, Countable
    {
    }

### Usage

    !php
    // a class may implement several interfaces, but may extend only one class!
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

[PSR-0](http://www.php-fig.org/psr/psr-0/) describes a set of rules related to
namespaces for autoloader interoperability:

    !php
    \ns\package\Class_Name      => vendor/ns/package/Class/Name.php
    \ns\package_name\Class_Name => vendor/ns/package_name/Class/Name.php

---

# The `class` Keyword

Since PHP 5.5.0, class name resolution is possible via `::class`.

    !php
    namespace My\Namespace;

    class ClassName
    {
    }

Assuming the class definition above, you can get the **F**ully **Q**ualified
**C**lass **N**ame (FQCN) by doing:

    !php
    echo ClassName::class;
    // My\namespace\ClassName

> Read more about the `class` keyword:
[http://www.php.net/manual/en/language.oop5.basic.php](http://www.php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class).

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

An **anonymous function**, also known as **lambda** function, is a function
defined, and possibly called, without being bound to an identifier.

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

A **closure** is an anonymous function that owns a context.

    !php
    $fibonacci = function ($n) use (&$fibonacci) {
        if (0 === $n || 1 === $n) {
            return $n;
        }

        return $fibonacci($n - 1) + $fibonacci($n - 2);
    };

    echo (int) $fibonacci(6);
    => 8

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

---

# Generators

A **generator function** looks just like a normal function, except that instead
of returning a value, a generator **yields** as many values as it needs to.

The heart of a generator function is the `yield` keyword.

> Read more about **generators**:
>
> * [http://www.php.net/manual/en/language.generators.php](http://www.php.net/manual/en/language.generators.php);
> * [What Generators Can Do For
You](http://blog.ircmaxell.com/2012/07/what-generators-can-do-for-you.html);
> * [https://github.com/nikic/iter](https://github.com/nikic/iter) (examples).
