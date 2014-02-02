# Awesome Projects

---

# Assert

---

# Carbon

---

# Faker

---

# Gaufrette

---

# Option Type for PHP

    !php
    class MyRepository
    {
        public function findSomeEntity($criteria)
        {
            return \PhpOption\Option::fromValue($this->em->find(...));
        }
    }

### You always Require an Entity in Calling Code

    !php
    // returns entity, or throws exception
    $entity = $repository->findSomeEntity(...)->get();

### Fallback to Default Value If Not Available

    !php
    $entity = $repository->findSomeEntity(...)->getOrElse(new Entity());


<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/schmittjoh/php-option">phpoption/phpoption</a></p>
</blockquote>

---

# PHP-Parser

---

#<br>![React](../images/react.png)

Event-driven, non-blocking I/O with PHP:
[http://reactphp.org/](http://reactphp.org/).

.fx: center

---

# Snappy
