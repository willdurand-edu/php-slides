# Databases

---

# Agenda

* Database Design Patterns
* Data Access Layer

---

# Quick note

In our context, a **database** is seen as a server hosting:

* a set of `records`;
* organised through `tables` or `collections`;
* grouped by `databases`.

---

# Database Design Patterns

* Row Data Gateway
* Table Data Gateway
* Active Record
* Data Mapper
* etc.

Definitions and figures are part of the [Catalog of Patterns of Enterprise
Application Architecture](http://martinfowler.com/eaaCatalog/index.html)
created by **Martin Fowler**.

Don't forget his name! Read his books!

---

# Row Data Gateway ![](http://martinfowler.com/eaaCatalog/dbgateRow.gif)

---

# Row Data Gateway

An object that acts as a Gateway to a single record (row) in a database.
There is one instance per row.

    !php
    class Banana
    {
        private $id;

        private $name;

        public function getId()
        {
            return $this->id;
        }

        public function getName()
        {
            return $this->name;
        }

        public function setName($name)
        {
            $this->name = $name;
        }
    }

---

# Row Data Gateway

### Usage

    !php
    $con = new Connection('...');

    $banana = new Banana();
    $banana->setName('Super Banana');

    // Save the banana
    $banana->insert($con);

    // Update it
    $banana->setName('New name for my banana');
    $banana->update($con);

    // Delete it
    $banana->delete($con);

---

# Row Data Gateway

### Under the hood

    !php
    public function insert(Connection $con)
    {
        // Prepared statement
        $stmt = $this->con->prepare('INSERT INTO bananas VALUES (:name)');

        $stmt->bind(':name', $name);

        $stmt->execute();

        // Set the id for this banana
        //
        // It becomes easy to know whether the banana is new or not,
        // you just need to check if id is defined.
        $this->id = $this->con->lastInsertId();
    }

---

# Table Data Gateway ![](http://martinfowler.com/eaaCatalog/dbgateTable.gif)

---

# Table Data Gateway

An object that acts as a _Gateway_ to a database table.
One instance handles all the rows in the table.

It's a **D**ata **A**ccess **O**bject.

    !php
    $table = new BananaGateway(new Connection('...'));

    // Insert a new record
    $id = $table->insert('My favorite banana');

    // Update it
    $table->update($id, 'THE banana');

    // Delete it
    $table->delete($id);


### CRUD

A DAO implements the well-known **C**reate **R**ead **U**pdate
**D**elete methods.

**R**ead should not be a single method: **Finders** to the rescue!

---

# Table Data Gateway

### Implementation

    !php
    class BananaGateway
    {
        private $con;

        public function __construct(Connection $con)
        {
            $this->con = $con;
        }

        public function insert($name) {}

        public function update($id, $name) {}

        public function delete($id);
    }

---

# Table Data Gateway

### The insert method

    !php
    /**
     * @param string $name The name of the banana you want to create
     *
     * @return int The id of the banana
     */
    public function insert($name)
    {
        // Prepared statement
        $stmt = $this->con->prepare('INSERT INTO bananas VALUES (:name)');

        $stmt->bind(':name', $name);

        $stmt->execute();

        return $this->con->lastInsertId();
    }

---

# Table Data Gateway

### The update method

    !php
    /**
     * @param int    $id   The id of the banana to update
     * @param string $name The new name of the banana
     *
     * @return bool Returns `true` on success, `false` otherwise
     */
    public function update($id, $name)
    {
        $stmt = $this->con->prepare(<<<SQL
    UPDATE bananas
    SET name = :name
    WHERE id = :id
    SQL
        );

        $stmt->bind(':id', $id);
        $stmt->bind(':name', $name);

        return $stmt->execute();
    }

---

# Table Data Gateway

### The delete method

    !php
    /**
     * @param int $id The id of the banana to delete
     *
     * @return bool Returns `true` on success, `false` otherwise
     */
    public function delete($id)
    {
        $stmt = $this->con->prepare('DELETE FROM bananas WHERE id = :id');

        $stmt->bind(':id', $id);

        return $stmt->execute();
    }

---

# Table Data Gateway

### Finders

    !php
    // Retrive all bananas
    $bananas = $table->findAll();

    // Find bananas by name matching 'THE %'
    $bananas = $table->findByName('THE %');

    // Retrieve a given banana using its id
    $banana = $table->find(123);

    // Find one banana by name matcing 'THE %'
    $banana = $table->findOneByName('THE %');

> Use the `__call()` magic method to create magic finders:
[http://www.php.net/manual/en/language.oop5.overloading.php#object.call](http://www.php.net/manual/en/language.oop5.overloading.php#object.call).

---

# Active Record ![](http://martinfowler.com/eaaCatalog/activeRecordSketch.gif)

---

# Active Record

An object that wraps a row in a database table, encapsulates
the database access, and adds domain logic on that data.

## Active Record = Row Data Gateway + Domain Logic

    !php
    $con = new Connection('...');

    $banana = new Banana();
    $banana->setName('Another banana');
    $banana->save($con);

    // Call a method that is part of the domain logic
    // What can a banana do anyway?
    $banana->growth();

    // Smart `save()` method
    // use `isNew()` under the hood
    $banana->save($con);

---

# Active Record

    !php
    class Banana
    {
        private $height = 1;

        public function growth()
        {
            $this->height++;
        }

        public function save(Connection $con)
        {
            if ($this->isNew()) {
                // issue a INSERT query
            } else {
                // issue an UPDATE query
            }
        }

        public function isNew()
        {
            // Yoda style
            return null !== $this->id;
        }
    }

---

# Data Mapper ![](http://martinfowler.com/eaaCatalog/databaseMapperSketch.gif)

---

# Data Mapper

A layer of Mappers (473) that moves data between objects and a database
while keeping them independent of each other and the mapper itself.

Sort of _"Man in the Middle"_.

    !php
    class BananaMapper
    {
        private $con;

        public function __construct(Connection $con)
        {
            $this->con = $con;
        }

        public function persist(Banana $banana)
        {
            // code to save the banana
        }

        public function remove(Banana $banana)
        {
            // code to delete the banana
        }
    }

---

# Data Mapper

### Usage

    !php
    $banana = new Banana();
    $banana->setName('Fantastic Banana');

    $con    = new Connection('...');
    $mapper = new BananaMapper($con);

    $mapper->persist($banana);

    $mapper->remove($banana);

But also:

    !php
    // Retrieve a collection
    $bananas = $mapper->findAll();

    // or a single record
    $banana = $mapper->find(123);

---

# Data Access Layer

---

# Data Access Layer

A **D**ata **A**ccess **L**ayer (DAL) is a standard API to manipulate data,
no matter which database server is used.

The **D**ata **S**ource **N**ame (DSN) can be used to determine which database
vendor you are using.

### PHP Data Object (PDO)

A DSN in PHP looks like: `<database>:host=<host>;dbname=<dbname>` where:

* `<database>` can be: `mysql`, `sqlite`, `pgsql`, etc;
* `<host>` is the IP address of the database server (most of the time `localhost`);
* `<dbname>` is your database name.

> [http://www.php.net/manual/en/intro.pdo.php](http://www.php.net/manual/en/intro.pdo.php)

---

# Data Access Layer

### PDO usage

    !php
    $dsn = 'mysql:host=localhost;dbname=test';

    $con = new PDO($dsn, $user, $password);

    // Prepared statement
    $stmt = $con->prepare($query);
    $stmt->execute();

Looks like the `Connection` class we used before, right?

    !php
    class Connection extends PDO
    {
    }

### Usage

    !php
    $con = new Connection($dsn, $user, $password);

---

# Data Access Layer

### Refactoring

Refactoring is a disciplined technique for restructuring an existing
body of code, altering its internal structure without changing its
external behavior.

    !php
    class Connection extends PDO
    {
        /**
         * @param string $query
         * @param array  $parameters
         *
         * @return bool Returns `true` on success, `false` otherwise
         */
        public function executeQuery($query, $parameters = array())
        {
            $stmt = $this->prepare($query);

            foreach ($parameters as $name => $value) {
                $stmt->bind(':' . $name, $value);
            }

            return $stmt->execute();
        }
    }

---

# Data Access Layer

### Usage

    !php
    /**
     * @param int    $id   The id of the banana to update
     * @param string $name The new name of the banana
     *
     * @return bool Returns `true` on success, `false` otherwise
     */
    public function update($id, $name)
    {
        $query = 'UPDATE bananas SET name = :name WHERE id = :id';

        return $this->con->executeQuery($query, array(
            'id'    => $id,
            'name'  => $name,
        ));
    }

---

# Your turn!
