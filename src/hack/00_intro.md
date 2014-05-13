# Hack

---

# What Is Hack?

<br>
![](../images/hack.png)
<br>

* 2004 - Facebook was initially built with PHP;
* 2009 - A PHP compiler called HipHop was released;
* 2010 - Minor changes to the PHP language were introduced by the HPHP team to
  improve development time and provide basic type safety. The changes were XHP
  and parameter type constraints;
* 2012 - Facebook engineering teams started exploring the idea of annotating
  return types. And the Hack language was born...

---

# What Is Hack?

**Hack** is a **programming language** for HHVM that interoperates seamlessly
with PHP. It has been created by Facebook. In general, anything you can write in
PHP, you can also write in Hack.

Hack reconciles the fast development cycle of PHP with the discipline provided by
**static typing**, while **adding many features** commonly found in other modern
programming languages such as
[**generics**](http://docs.hhvm.com/manual/en/hack.generics.php),
[**collections**](http://docs.hhvm.com/manual/en/hack.collections.php), and
[**nullable**](http://docs.hhvm.com/manual/en/hack.nullable.php).

> Official website: [hacklang.org](http://hacklang.org/)

---

# Getting Started

Use `<?hh` at the top of your file; you can also change `<?php` to `<?hh` in
existing PHP files, and your code will run just as before in HHVM.

Optionally name your file with the .hh extension to distinguish your Hack files
from your PHP files. Of course, you can keep the name of the file .php (or any
other extension that you use).

**Important:** Hack and HTML code do not mix.

### Example

    !php
    <?hh
    class MyClass {
        public function hello(): string {
            return 'Hello, World!';
        }
    }

    function f(MyClass $m): string {
        return $m->hello();
    }

---

# Type Annotations

...

> [http://docs.hhvm.com/manual/en/hack.annotations.php](http://docs.hhvm.com/manual/en/hack.annotations.php)

---

# Generics

...

> [http://docs.hhvm.com/manual/en/hack.generics.php](http://docs.hhvm.com/manual/en/hack.generics.php)

---

# Collections

...

> [http://docs.hhvm.com/manual/en/hack.collections.php](http://docs.hhvm.com/manual/en/hack.collections.php)

---

# Nullable Types

...

> [http://docs.hhvm.com/manual/en/hack.nullable.php](http://docs.hhvm.com/manual/en/hack.nullable.php)
