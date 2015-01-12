# Leveraging PHP APIs

---

# Built-in Interfaces

### ArrayAccess

Access properties as an array:

    !php
    $tom = new MyObject();
    $tom['name'] = 'Tom';

### Serializable, JsonSerializable

Allow the use of `serialize()` and `unserialize()`.
Objects implementing `JsonSerializable` can customize their JSON representation
when encoded with `json_encode()`.

### Traversable

Allow the use of `foreach`.

> Read more:
[http://fr2.php.net/manual/en/reserved.interfaces.php](http://fr2.php.net/manual/en/reserved.interfaces.php).

---

# The Reflection API (1/2)

Enable code introspection:

    !php
    /** A comment */
    class MyClass
    {
        public function hello() { printf("Hello %s", $this->getName()); }

        protected function getName() { return 'foo'; }
    }

    $reflClass = new ReflectionClass('MyClass');

    // access comments
    var_dump($reflClass->getDocComment());
    // string(16) "/** A comment */"

    // get all methods
    $reflClass->getMethods();

    // get all public methods
    $reflClass->getMethods(ReflectionMethod::IS_PUBLIC);


---

# The Reflection API (2/2)

It is even possible to invoke private methods!

    !php
    class MyClass
    {
        public function hello() { printf("Hello %s", $this->getName()); }

        private function getName() { return 'foo'; }
    }

    $reflClass = new ReflectionClass('MyClass');

    // access private method
    $method = $reflClass->getMethod('getName');
    $method->setAccessible(true);

    $method->invoke(new MyClass());
    // 'foo'


> Read more:
[http://php.net/manual/en/book.reflection.php](http://php.net/manual/en/book.reflection.php).

---

# The Standard PHP Library (SPL)

Provides a collection of classes and interfaces:

### Datastructures

`SplStack`, `SplQueue`,
[`SplObjectStorage`](http://php.net/manual/en/class.splobjectstorage.php), etc.

### Named Exceptions

`LogicException`, `InvalidArgumentException`, `OutOfRangeException`,
`RuntimeException`, etc.

### SPL Functions

`class_parents()`, `spl_autoload_register()`, `spl_autoload_unregister()`, etc.

> Read more about the **SPL**:
[http://php.net/manual/en/book.spl.php](http://php.net/manual/en/book.spl.php).

---

# Observer Pattern (1/2)

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

    $observer1 = new Observer();

    $subject->attach($observer1);

    $subject->notify();

> Read more: [http://php.net/manual/en/class.splobserver.php](http://php.net/manual/en/class.splobserver.php).

---

# Observer Pattern (2/2)

Those interfaces are **never** used as there is only one default **channel** for
the `notify()` method.

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

> Read more:
[http://symfony.com/doc/master/components/event_dispatcher/](http://symfony.com/doc/master/components/event_dispatcher/index.html).

---

# Exceptions (1/2)

`try`-`catch` block with multiple `catch` statements:

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
    class SomethingWentWrong extends RuntimeException
    {
    }

    class ErrorWhileDoingSomething extends Exception implements ExceptionInterface
    {
    }

**Name** your named exceptions!

---

# Exceptions (2/2)

`try`-`catch` blocks also supports a `finally` block for code that should be run
regardless of whether an exception has been thrown or not:

    !php
    try {
        // ..
    } catch (Exception $e) {
        // do something
    } finally {
        // the code here will always be executed
    }

---

# Password Hashing

The password hashing API provides an easy to use wrapper around `crypt()` to
make it easy to create and manage passwords in a secure manner, since PHP 5.5.0.

`password_hash()` and `password_verify()` are your new friends!

    !php
    $passwordHash = password_hash('secret-password', PASSWORD_DEFAULT);

    if (password_verify('bad-password', $passwordHash)) {
        // Correct Password
    } else {
        // Wrong password
    }

> Read more about the **Password Hashing API**:
[http://www.php.net/manual/en/book.password.php](http://www.php.net/manual/en/book.password.php).

<p></p>

> A **userland implementation** exists for PHP >= 5.3.7:
[password_compat](https://github.com/ircmaxell/password_compat).

---

# PHP Archive (PHAR)

The phar extension provides a way to put entire PHP applications into
a single file called a "phar" (PHP Archive) for easy distribution and
installation.

But, the API is **hard** to use.

Solution? [Box](http://box-project.org/), a command line for simplifying
the PHAR creation process.

> Read more about **PHAR**:
>
> * [http://www.php.net/manual/en/intro.phar.php](http://www.php.net/manual/en/intro.phar.php);
> * [http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive](http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive).
