# Databases

---

# Agenda

---

# ...

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

---

# Row Data Gateway

---

# Row Data Gateway

An object that acts as a Gateway to a single record (row) in a database.

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

# Table Data Gateway

---

# Table Data Gateway

An object that acts as a _Gateway_ to a database table.

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

# Active Record

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

# Data Mapper

---

# Data Mapper


