# Leveraging PHP APIs

---

# The Reflection API

[http://www.php.net/manual/en/book.reflection.php
](http://www.php.net/manual/en/book.reflection.php)

---

# The Standard PHP Library (SPL)

Provides a collection of classes and interfaces:

* **Datastructures**: `SplStack`, `SplQueue`, etc.
* **Iterators**, named **Exceptions**, SPL functions.

> Read more about the **SPL**:
[http://php.net/manual/en/book.spl.php](http://php.net/manual/en/book.spl.php).

---

# Observer/Observable

The `SplObserver` interface is used alongside `SplSubject` to implement the
**Observer** Design Pattern.

> Read more: [php.net/manual/en/class.splobserver.php](php.net/manual/en/class.splobserver.php).

However, these classes have limitations:

* Classes have to extend `SplSubject`;
* A subject can only notify on one channel (only a `notify()` method).

Symfony2 [EventDispatcher](https://github.com/symfony/EventDispatcher)
component to the rescue!

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

Solution? [Box](http://box-project.org/), a command line for simplifying
the PHAR creation process.

> Read more about **PHAR**:
>
> * [http://www.php.net/manual/en/intro.phar.php](http://www.php.net/manual/en/intro.phar.php);
 * [http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive](http://blog.pascal-martin.fr/post/php-5.3-phar-php-archive).
