Sessions
========

---

Overview
========

### A way to persist browsing data accross client calls

* unique identifier ;
* stored server side ;
* easy to use ;
* built in.

### Some usecase:

* Keep user auhentication and roles ;
* Store cart ;
* Store a flash message between redirections.

---

Code Please
-----------

    !php
    // initalize session
    session_start();

    // regenerate identifier
    session_regenerate_id();

    // affect "key"
    $_SESSION['key'] = $value;

    // retrieve key
    $_SESSION['key'];

    // terminate session
    session_destroy();


> session should be started before headers are sent !

> http://php.net/manual/en/book.session.php

---

Security Concerns
=================

* Cookie hijacking / XSS ;
* Man in the middle ;
* predicatable session token.

Workarounds
-----------

* Regenerate ids when authentication changes ;
* Validate client informations (user agent) ;
* Maximum lifetime ;
* Use HTTPS.


