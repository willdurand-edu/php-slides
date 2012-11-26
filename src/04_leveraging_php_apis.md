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

[http://php.net/manual/en/book.spl.php](http://php.net/manual/en/book.spl.php)

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

