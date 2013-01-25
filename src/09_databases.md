# Databases

---

# Agenda

* Database Design Patterns
* Data Access Layer
* Object Relational Mapping
* Existing Components

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
* Identity Map
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

        $stmt->bindValue(':name', $name);

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

        $stmt->bindValue(':name', $name);

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

        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':name', $name);

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

        $stmt->bindValue(':id', $id);

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
    $banana->grow();

    // Smart `save()` method
    // use `isNew()` under the hood
    $banana->save($con);

---

# Active Record

    !php
    class Banana
    {
        private $height = 1;

        public function grow()
        {
            $this->height++;
        }

        public function save(Connection $con)
        {
            if ($this->isNew()) {
                // issue an INSERT query
            } else {
                // issue an UPDATE query
            }
        }

        public function isNew()
        {
            // Yoda style
            return null === $this->id;
        }
    }

---

# Data Mapper ![](http://martinfowler.com/eaaCatalog/databaseMapperSketch.gif)

---

# Data Mapper

A layer of Mappers that moves data between objects and a database
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

# Identity Map ![](http://martinfowler.com/eaaCatalog/idMapperSketch.gif)

---

# Identity Map

Ensures that each object gets loaded only once by keeping every loaded object in
a map. Looks up objects using the map when referring to them.

    !php
    class Finder
    {
        private $identityMap = array();

        public function findOneById($id)
        {
            if (!isset($this->identityMap[$id])) {
                // fetch the object for the given id
                $this->identityMap[$id] = ...;
            }

            return $this->identityMap[$id];
        }
    }

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
                $stmt->bindValue(':' . $name, $value);
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

# Object Relational Mapping

---

# Object Relational Mapping (1/4)

Introduces the notion of **relations** between objects:

* One-To-One;
* One-To-Many;
* Many-To-Many.

An **ORM** is often considered as a _tool_ that implements some design patterns
seen above, and that eases relationships between objects.

---

# Object Relational Mapping (2/4)

### One-To-One (1-1)

![](http://yuml.me/diagram/scruffy;/class///%20Cool%20Class%20Diagram,%20%5BBanana%5D%3C1---1%3E%5BProfile%5D.png)


### Example

    !php
    $profile = $banana->getProfile();

---

# Object Relational Mapping (3/4)

### One-To-Many (1-N)

![](http://yuml.me/diagram/scruffy;/class/%5BBananaTree%5D++-0..N%5BBanana%5D.png)

### Example

    !php
    $bananas = $bananaTree->getBananas();

---

# Object Relational Mapping (4/4)

### Many-To-Many (N-N)

![](http://yuml.me/diagram/scruffy;/class/%5BBanana%5D1-0..N%5BBananaRole%5D,%20%5BBananaRole%5D0..N-1%5BRole%5D.png)

### Example

    !php
    $roles = array();
    foreach ($banana->getBananaRoles() as $bananaRole) {
        $roles[] = $bananaRole->getRole();
    }

    // Or, better:
    $roles = $banana->getRoles();

---

# Existing Components

### Propel ORM

An ORM that implements the **Table Data Gateway** and **Row Data Gateway**
patterns, often seen as an **Active Record** approach.

> Documentation: [propelorm.org](http://www.propelorm.org).

### Doctrine2 ORM

An ORM that implements the **Data Mapper** pattern.

> Documentation: [doctrine-project.org](http://www.doctrine-project.org/).

---

# Your Turn!
