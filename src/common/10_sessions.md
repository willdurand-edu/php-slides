# Sessions

---

# Overview

Sessions are a way to preserve certain data across subsequent accesses.

### In A Nutshell

* Unique identifier (session id);
* Server side;
* Easy to use;
* Built-in.

### A few use cases:

* Keeping user authentication and roles;
* Storing items into a cart;
* Storing a flash message between redirections.

---

# Code Please

    !php
    // Initalize session
    session_start();

    // Regenerate identifier
    session_regenerate_id();

    // Assign "key" to `$value`
    $_SESSION['key'] = $value;

    // Retrieve "key"
    $_SESSION['key'];

    // Terminate session
    session_destroy();


> Session should be started before headers are sent!
> [http://php.net/manual/en/book.session.php](http://php.net/manual/en/book.session.php).

---

# Security Concerns

* Session fixation;
* Session hijacking;
* Man in the Middle (capture);
* Predicatable session token.

### Workarounds

* Regenerate ids when authentication changes;
* Validate client informations (user agent);
* Maximum lifetime;
* Use HTTPS.
