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

---

# Flysystem

Filesystem abstraction layer.

    !php
    use League\Flysystem\Filesystem;
    use League\Flysystem\Adapter\Local as LocalAdapter;

    // Adapters: Local, Amazon Web Services - S3, Rackspace Cloud Files,
    //           Dropbox, Ftp, Sftp, Zip, WebDAV
    $filesystem = new Filesystem(new LocalAdapter(__DIR__ . '/path/to/root'));

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

---

#<br>![React](../images/react.png)

Event-driven, non-blocking I/O with PHP:
[http://reactphp.org/](http://reactphp.org/).

.fx: center

---

# Snappy
