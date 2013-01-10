# Leveraging PHP APIs

---

# Built in interfaces

## ArrayAccess

Access properties as an array:

    !php
    $tom = new MyObject();
    $tom['name'] = 'Tom';

## Serializable

Allow the use of `serialize` and `unserialize`.

## Traversable

Allow the use of `foreach`.

> Read more [http://fr2.php.net/manual/en/reserved.interfaces.php](http://fr2.php.net/manual/en/reserved.interfaces.php)

---

# The Reflection API (1/2)

Enable code introspection:

    !php
    /** a comment */
    class MyClass
    {
        protected function getName() {
            return 'foo';
        }

        public function hello()
        {
            printf("Hello %s", $this->getName());
        }
    }

    $ref = new ReflectionClass('MyClass');

    // access comments
    var_dump($ref->getDocComment());
    // string(16) "/** a comment */"

    // get all public methods
    $ref->getMethods(ReflectionMethod::IS_PUBLIC);

---

# The Reflection API (2/2)

It is even posible to invoke protected methods !

    !php
    class MyClass
    {
        protected function getName() {
            return 'foo';
        }

        public function hello()
        {
            printf("Hello %s", $this->getName());
        }
    }

    $ref = new ReflectionClass('MyClass');

    // access protected method
    $method = $ref->getMethod('getName');
    $method->setAccessible(true);

    $method->invoke(new MyClass());
    // Hello


> Read more [http://www.php.net/manual/en/book.reflection.php
](http://www.php.net/manual/en/book.reflection.php)

---

# The Standard PHP Library (SPL)

Provides a collection of classes and interfaces:

## Datastructures

`SplStack`, `SplQueue`, `OutOfRangeException`, etc;

## Named Exceptions

`LogicException`, `InvalidArgumentException`, etc.

## SPL functions

`class_parents`, `spl_autoload_register`, `spl_autoload_unregister`, etc.

## Iterators, interfaces...

> Read more about the **SPL**:
[http://php.net/manual/en/book.spl.php](http://php.net/manual/en/book.spl.php).

---

# Observer/Observable (1/2)

The `SplObserver` interface is used alongside `SplSubject` to implement the
**Observer** Design Pattern.

    !php
    class Subject implements SplSubject
    {
        /* ... */
    }

    class Observer implements SplObserver
    {
        /* ... */
    }

    $subject = new Subject();

    $oberver1 = new Observer();

    $subject->attach($observer1);

    $subject->notify();

> Read more: [php.net/manual/en/class.splobserver.php](php.net/manual/en/class.splobserver.php).

---

# Observer/Observable (2/2)

Those interfaces are **never** used as no **channel** can be specified for the
`notify()` method.

Symfony2 [EventDispatcher](https://github.com/symfony/EventDispatcher)
component to the rescue!

    !php
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\EventDispatcher\Event;

    $dispatcher = new EventDispatcher();

    $dispatcher->addListener('event_name', function (Event $event) {
        // ...
    });

    $dispatcher->dispatch('event_name');

> Read more: [http://symfony.com/doc/2.0/components/event_dispatcher/](http://symfony.com/doc/2.0/components/event_dispatcher/).

---

# Exceptions

`try`/`catch` block with multiple `catch` statements:

    !php
    try {
        // ...
    } catch (RuntimeException $e) {
        // do something
    } catch (Exception $e) {
        // do something else
    }

Create your own exceptions:

    !php
    class MyException extends RuntimeException
    {
    }

    class MyException extends Exception implements ExceptionInterface
    {
    }

---

# PHP Archive (PHAR)

The phar extension provides a way to put entire PHP applications into
a single file called a "phar" (PHP Archive) for easy distribution and
installation.

But, the API is **hard** to use.

Solution? [Box](http://box-project.org/), a command line to ease
PHAR creation process.

> Read more about **PHAR**:
>
> * [http://www.php.net/manual/en/intro.phar.php](http://www.php.net/manual/en/intro.phar.php);
 * [http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive](http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive).
