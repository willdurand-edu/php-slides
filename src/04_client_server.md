# Client server

---

# Client - server basics

A typical `client - server` request follows this pattern :

![](images/client-server.png)

* **Client**: Hello _server_, give me the _ressource_ at `URI`

* **Server**: Here is the ressource at `URI`<br />

    `> Content`

For  HTTP, a typical client is a `web browser`, and a server is a `webserver`.

---

# HTTP request

Request is made of:

* A _Unique Ressource Identifier_ (URI)
* An _HTTP verb_ describing the action
* Some _headers_ describing requirements
* A _request body_ to send data

Here is an example:

    !html
    GET /my/simple/uri?with-query-string HTTP/1.1
    Host example.net
    Content-Type: text/plain; charset=utf-8
    Content-Length: length

    This is a content

---

# HTTP response

Response is made of:

* Some _headers_ to describe the content
* The response _status__
* The _content_ of the request

Here is an example:

    !html
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Length: length

    <!DOCTYPE HTML>
    <html>
        <head>
        </head>
        <body>
            <h1>Hello world !</h1>
        </body>
    </html>

---

# HTTP verbs

An HTTP verb is an action to perform on _ressource_ located at _uri_:

* `GET`: retrieve a _ressource_ or a _collection of ressources_
* `POST`: update _ressource_
* `PUT`: create a new _ressource_
* `DELETE`: delete given _ressource_
* `PATCH`: partial update of given _ressource_

---

# HTTP parameters (1/2)

There is two types of parameters, `query string` and `request body`.

If request follows the `url form encoded` format, you can access parameters
through global variable.

* `query string`: `$_GET`
* `request body`: `$_POST`
* All parameters are vailable in `$_REQUEST` global variable.

You can always use the following, but you need to parse it by yourself:

* `query string`: `$_SERVER['QUERY_STRING']`
* `request body`: `$HTTP_RAW_POST_DATA`

**Note**: Do not use `$_REQUEST`, as there is a collision risk !

---

# HTTP parameters (2/2)

    !html
    GET /my/simple/uri?a=1&id=2 HTTP/1.1
    Host example.net
    Content-Type: text/plain; charset=utf-8
    Content-Length: length

    b=3&city=paris

Will result in:

    !php
    $_GET = array("a" => 1, "id" => 2);

    $_POST = array("b" => 3, "city" => 'paris');

    $_REQUEST = array("a" => 1, "id" => 2, "b" => 3, "city" => 'paris');

    $_SERVER['QUERY_STRING'] = "a=1&id=2";

    $HTTP_RAW_POST_DATA = "b=3&city=paris";

---

# Use a Request class

You are encouraged to map request parameter access in a dedicated class :

    !php
    interface HttpRequest
    {
        // factory
        static public function createFromGlobals();

        public function getParameter($paramName, $default=null);

        public function hasParameter($paramName, $default=null);
    }

---

# REST (Representational State Transfer)

Each URI represent a unique `ressource` that can be formatted as requested
(`json`, `xml`, `html`).

* `/banana/joe`: _URI_ for banana Joe
* `/banana/henry`: _URI_ for banana Henry

Those ressources are organized into collections

* `/bananas`: collection of all available bananas

So it make sense to use HTTP verbs to execute an action:

> GET `/banana/joe` will return banana Joe.

And:

> DELETE `/bananas` will delete all bananas in the collection !
