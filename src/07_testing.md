# Testing

---

# Agenda

* Unit Testing
* Functional Testing
* Behavior Driven Development

---

# Unit Testing

---

# Unit Testing

Unit testing is a Method by which individual units of source code are tested to
determine if they are fit for use.

[PHPUnit](http://www.phpunit.de/manual/current/en/) is the de-facto standard for
unit testing in PHP projects.

Install it using Composer:

    !javascript
    {
        "require-dev": {
            "phpunit/phpunit": "3.7.*"
        }
    }

Or as a PHAR:

    !bash
    $ wget http://pear.phpunit.de/get/phpunit.phar
    $ chmod +x phpunit.phar

---

# Using PHPUnit

## The Rules

The tests for a class `Class` go into a class `ClassTest`.

`ClassTest` inherits (most of the time) from `PHPUnit_Framework_TestCase`, but
a common practice is to create a `TestCase` class for a project, and to inherit
from it:

    !php
    class TestCase extends PHPUnit_Framework_TestCase {}

The tests are public methods that are named `test*`.
You can also use the `@test` annotation:

    !php
    class ClassTest extends TestCase
    {
        public function testFoo()
        {
            $object = new MyClass();
            $this->assertEquals('foo', $object->foo(), 'optional comment');
        }
    }

---

# PHPUnit Assertions

`assertEquals()`, `assertTrue()`, `assertFalse()`, etc.

See all assertion methods: [http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html](http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html#writing-tests-for-phpunit.assertions).

---

# Running PHPUnit

Running the test suite:

    !bash
    $ phpunit
    PHPUnit 3.7.0 by Sebastian Bergmann.

    .

    Time: 1 seconds, Memory: 5.25Mb

    OK (1 test, 1 assertion)


Getting the code coverage:

    !bash
    $ phpunit --coverage-text


See also:

    !bash
    $ phpunit --log-junit junit_output.xml

    $ phpunit --testdox

---

# Functional Testing

---

# Functional Testing

Also known as **acceptance testing**.

Use tools to create automated tests that actually use your application instead
of just verifying that individual units of code are behaving correctly.

* [Selenium](http://seleniumhq.org/)
* [Mink](http://mink.behat.org/)

---

# Behavior Driven Development

---

# Behavior Driven Development

## SpecBDD

* You write specifications that describe how your actual code should
behave;
* Focused on technical behavior;
* [PHPSpec](http://www.phpspec.net/).

## StoryBDD

* You write human-readable stories that describe the behavior of your
application;
* Business oriented;
* [Behat](http://behat.org/).

---

# Behat

Install **Behat** via Composer:

    !javascript
    {
        "require-dev": {
            "behat/behat": "2.4.*@stable"
        },
        "config": {
            "bin-dir": "bin/"
        }
    }

The `bin/behat` command is now installed!

Or as a PHAR:

    !bash
    $ wget https://github.com/downloads/Behat/Behat/behat.phar
    $ chmod +x behat.phar

---

# Using Behat (1/2)

Initialize your project:

    !bash
    $ bin/behat --init

Define a **Feature**:

    !gherkin
    # features/your_first_feature.feature
    Feature: Your first feature
      In order to start using Behat
      As a manager or developer
      I need to try

Define a **Scenario**:

    !gherkin
    Scenario: Successfully describing scenario
      Given there is something
      When I do something
      Then I should see something

---

# Using Behat (2/2)

Executing Behat:

    !bash
    $ behat

Writing your Step definitions:

    !php
    /**
     * @Given /^there is something$/
     */
     public function thereIsSomething()
     {
        throw new PendingException();
     }

**Must Read**: [https://speakerdeck.com/everzet/behat-by-example
](https://speakerdeck.com/everzet/behat-by-example).

> Read more about Behat:
[http://docs.behat.org/](http://docs.behat.org/).
