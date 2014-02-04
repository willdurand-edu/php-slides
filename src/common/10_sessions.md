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

* Prediction (guessing a valid session identifier);
* Man in the Middle (capturing a valid session identifier);
* Session Fixation (attacker chooses the session identifier);
* Session Hijacking (all attacks that attempt to gain access to another user's
  session).

### Workarounds

* Regenerate ids when authentication changes;
* Bind sessions to IP addresses;
* Define expiration/timeout;
* Don't rely on the default settings;
* Use HTTPS.

---

# Session Configuration

An example of PHP session configuration that is more secure:

    !ini
    ; Helps mitigate XSS by telling the browser not to expose the cookie to
    ; client side scripting such as JavaScript
    session.cookie_httponly = 1

    ; Prevents session fixation by making sure that PHP only uses cookies for
    ; sessions and disallow session ID passing as a GET parameter
    session.use_only_cookies = 1

    ; Better entropy source
    ; Evades insufficient entropy vulnerabilities
    session.entropy_file = "/dev/urandom"
    ; `session.entropy_length` might help too!

    ; Smaller exploitation window for XSS/CSRF/Clickjacking...
    session.cookie_lifetime = 0

    ; Ensures session cookies are only sent over secure connections (it requires
    ; a valid SSL certificate)
    ; Related to OWASP 2013-A6-Sensitive Data Exposure
    session.cookie_secure = 1
