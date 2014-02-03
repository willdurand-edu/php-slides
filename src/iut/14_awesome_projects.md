# Awesome Projects

---

# Assert

Assertions and guard methods for input validation (not filtering!) in
business-model, libraries and application low-level code.

    !php
    use Assert\Assertion;
    use Assert\AssertionFailedException;

    try {
        \Assert\that($identifier)->notEmpty()->integer();
        Assertion::notEmpty($message, 'Message is not specified');
    } catch(AssertionFailedException $e) {
        $e->getValue();         // the value that caused the failure
        $e->getConstraints();   // the additional constraints of the assertion
    }

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/beberlei/assert">beberlei/assert</a></p>
</blockquote>

---

# Carbon

A simple API extension for `DateTime`.

    !php
    $tomorrow            = Carbon::now()->addDay();
    $lastWeek            = (new Carbon())->subWeek();
    $noonTodayLondonTime = Carbon::createFromTime(12, 0, 0, 'Europe/London');

    if (Carbon::now()->isWeekend()) {
        echo 'Party!';
    }

    Carbon::now()->subDays(5)->diffForHumans();    // 5 days ago

Freezing time:

    !php
    Carbon::setTestNow(Carbon::create(2001, 5, 21, 12));

    echo Carbon::now();   // 2001-05-21 12:00:00
                          // test, test, test!

    Carbon::setTestNow(); // clear the mock
    echo Carbon::now();   // 2014-02-02 21:00:00

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/briannesbitt/Carbon">briannesbitt/Carbon</a></p>
</blockquote>

---

# Faker

Fake data generator.

    !php
    // use the factory to create a `Faker\Generator` instance
    $faker = Faker\Factory::create();

    // generate data by accessing properties
    echo $faker->name;
    // 'Lucy Cechtelar';
    echo $faker->address;
    // "426 Jordy Lodge
    // Cartwrightshire, SC 88120-6700"
    echo $faker->text;
    // Sint velit eveniet. Rerum atque repellat voluptatem quia rerum. Numquam
    // beatae sint laudantium consequatur. Magni occaecati itaque sint et sit
    // tempore. Nesciunt amet quidem. Iusto deleniti cum autem ad quia aperiam.
    echo $faker->email;
    // 'tkshlerin@collins.com'
    echo $faker->ipv4;
    // '109.133.32.252'
    echo $faker->creditCardNumber;
    // '4485480221084675'

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/fzaninotto/Faker">fzaninotto/Faker</a></p>
</blockquote>

---

# Flysystem

Filesystem abstraction layer.

    !php
    use League\Flysystem as F

    // Adapters: Local, Amazon Web Services - S3, Rackspace Cloud Files,
    //           Dropbox, Ftp, Sftp, Zip, WebDAV
    $filesystem = new F\Filesystem(new F\Adapter\Local(__DIR__.'/path/to/dir'));

    // Create a file
    $filesystem->write('path/to/file.txt', 'contents');

    // Update a file
    $filesystem->update('file/to/update.ext', 'new contents');

    // Write or update a file
    $filesystem->put('filename.txt', 'contents');

    // Delete a file
    $filesyste->delete('delete/this/file.md');

    // Check if a file exists
    $exists = $filesystem->has('filename.txt');

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/thephpleague/flysystem">thephpleague/flysystem</a></p>
</blockquote>

---

# Mockery



    !php
    // The PHPUnit Way
    $mock = $this->getMock('SomeClass');
    $mock->expects($this->once())
        ->method('getName')
        ->will($this->returnValue('John Doe'));

    $mock2 = $this->getMock('AnotherClass');
    $mock2->expects($this->any())
        ->method('getNumber')
        ->with(2)
        ->will($this->returnValue(2));
    $mock2->expects($this->any())
        ->method('getNumber')
        ->with(3)
        ->will($this->returnValue(3));

    // The Mockery Way
    $mock = \Mockery::mock('SomeClass');
    $mock->shouldReceive('getName')->once()->andReturn('John Doe');

    $mock2 = \Mockery::mock('AnotherClass');
    $mock2->shouldReceive('getNumber')->with(2)->andReturn(2);
    $mock2->shouldReceive('getNumber')->with(3)->andReturn(3);

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/padraic/mockery">padraic/mockery</a></p>
</blockquote>

---

# Option Type for PHP

    !php
    use PhpOption\Option;

    class MyRepository
    {
        public function findSomeEntity($criteria)
        {
            return Option::fromValue($this->em->find(...));
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
    <p><a href="https://github.com/schmittjoh/php-option">schmittjoh/phpoption</a></p>
</blockquote>

---

# PHP-Parser

A PHP parser written in PHP, producing Abstract Syntax Trees (AST).

    !php
    <?php

    echo 'Hi', 'World';

<p></p>

    !text
    array(
        0: Stmt_Echo(
            exprs: array(
                0: Scalar_String(
                    value: Hi
                )
                1:
                Scalar_String(
                    value:
                    World
                )
            )
        )
    )

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/nikic/PHP-Parser">nikic/PHP-Parser</a></p>
</blockquote>

---

#<br>![React](../images/react.png)

Event-driven, non-blocking I/O with PHP:
[http://reactphp.org/](http://reactphp.org/).

.fx: center

---

# Swiftmailer

Comprehensive mailing tools for PHP.

    !php
    // Create the message
    $message = Swift_Message::newInstance()
        // Give the message a subject
        ->setSubject('Your subject')
        // Set the From address with an associative array
        ->setFrom([ 'john@doe.com' => 'John Doe' ])
        // Set the To addresses with an associative array
        ->setTo([ 'receiver@domain.org', 'other@domain.org' => 'A name' ])
        // Give it a body
        ->setBody('Here is the message itself')
        ;

    // Create the Transport
    $transport = Swift_SmtpTransport::newInstance('smtp.example.org', 25);

    // Create the Mailer using your created Transport
    $mailer = Swift_Mailer::newInstance($transport);

    // Send the message
    $result = $mailer->send($message);

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/swiftmailer/swiftmailer">swiftmailer/swiftmailer</a></p>
</blockquote>

---

# Whoops

PHP errors for cool kids.

![](../images/whoops.png)

<blockquote class="no-before-icon">
    <i class="fa fa-github"></i>
    <p><a href="https://github.com/filp/whoops">filp/whoops</a></p>
</blockquote>
