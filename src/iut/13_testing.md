# Testing

---

<h1>
<center>
<blockquote class="no-before-icon twitter-tweet" lang="en"><p>I don&#39;t need tests: tests are
for people who write bugs.</p>&mdash; Hipster Hacker (@hipsterhacker) <a
href="https://twitter.com/hipsterhacker/statuses/396352411754717184">November 1,
2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>
</h1>

---

# Agenda

* Unit Testing
* Functional Testing
* Behavior Driven Development
* Testing Tweet Frameworks

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
            "phpunit/phpunit": "~3.7"
        }
    }

Or as a PHAR:

    !bash
    $ wget http://pear.phpunit.de/get/phpunit.phar
    $ chmod +x phpunit.phar

---

# PHPUnit — The Rules

The tests for a class `Class` go into a class `ClassTest`.

`ClassTest` should inherit from `PHPUnit_Framework_TestCase`, but
a common practice is to create a `TestCase` class for a project, and to inherit
from it:

    !php
    class TestCase extends PHPUnit_Framework_TestCase {}

The tests are public methods that are named `test*`, but you can also use the
`@test` annotation:

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

# PHPUnit — Assertions

* `assertEquals()`
* `assertTrue()`
* `assertFalse()`
* etc.

> See all assertion methods:
[http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html](http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html#writing-tests-for-phpunit.assertions).

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

# Test Double

* **Dummy** objects are passed around but never actually used. Usually they are
  just used to fill parameter lists;
* **Fake** objects actually have working implementations, but usually take some
  shortcut which makes them not suitable for production (an in memory database
  is a good example);
* **Stubs** provide canned answers to calls made during the test, usually not
  responding at all to anything outside what's programmed in for the test. Stubs
  may also record information about calls, such as an email gateway stub that
  remembers the messages it 'sent', or maybe only how many messages it 'sent'
  &rarr; **State verification**;
* **Mocks** are objects pre-programmed with expectations which form a
  specification of the calls they are expected to receive &rarr; **Behavior
  verification**.

---

# Functional Testing

---

# Functional Testing

Also known as **acceptance testing**.

Use tools to create automated tests that actually use your application rather
than only verifying that individual units of code behave correctly.

* [Selenium](http://seleniumhq.org/)
* [Mink](http://mink.behat.org/)
* [CasperJS](http://casperjs.org/)

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

> **Must Read**:
[https://speakerdeck.com/everzet/behat-by-example](https://speakerdeck.com/everzet/behat-by-example).

<p></p>

> Read more about Behat:
[http://docs.behat.org/](http://docs.behat.org/).

---

# Testing Tweet Frameworks

### [Tweetest](http://adambrett.github.io/tweetest/)

    !php
    function tweetest($c,$m) {$c=is_callable($c)?$c():$c;echo($c)?'.':"F[{$m}]";}

    tweetest($testValue !== 'bar', '$testValue should never equal bar');


### [TestFrameworkInATweet.php](https://gist.github.com//mathiasverraes/9046427)

    !php
    function it($m,$p){echo ($p?'✔︎':'✘')." It $m\n";if(!$p){$GLOBALS['f']=1;}}
    function done(){if(@$GLOBALS['f'])die(1);}

    it("should sum two numbers", 1 + 1 == 2);
    it("should display an X for a failing test", 1 + 1 == 3);
    done();
