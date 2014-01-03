# Client/Server

---

# Client/Server Basics

A typical **client/server** request follows this pattern:

![](../images/client-server.png)

1. **Client**: Hello _server_, give me the _resource_ at _URI_;
2. **Server**: Here is the resource at _URI_:

    `Content`

For HTTP, a typical client is a **web browser**, and a server is a **web
server**.

---

# HTTP Request

Request is made of:

* A **Unique Resource Identifier** (URI);
* An **HTTP verb** describing the action;
* Some **headers** describing requirements;
* A **request body** to send data.

Here is an example:

    !html
    GET /my/simple/uri?with-query-string HTTP/1.1
    Host: example.org
    Content-Type: text/plain; charset=utf-8
    Content-Length: length

    This is a content

---

# HTTP Response

Response is made of:

* Some **headers** to describe the content;
* The response's **status code**;
* The **content** of the request;

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

# HTTP Verbs

An HTTP verb is an action to perform on a **resource** located at a given
**URI**:

* `GET`: retrieve a **resource** or a **collection of resources**;
* `POST`: create a new **resource**;
* `PUT`: update an existing **resource** _or_ create a new **resource** at a
  given URI;
* `DELETE`: delete a given **resource**;
* `PATCH`: partial update of a given **resource**.

**Important:** this list is not exhaustive.

---

# HTTP Parameters (1/2)

There are two types of parameters, **query string** and **request body**.

If the request follows the **URL Form Encoded** format, you can access
parameters through global variables:

* **query string**: `$_GET`;
* **request body**: `$_POST`;
* All parameters are available in the `$_REQUEST` global variable.

You can always use the following, but you need to parse them by yourself:

* **query string**: `$_SERVER['QUERY_STRING']`;
* **request body**: `$HTTP_RAW_POST_DATA`.

**Note**: Don't use `$_REQUEST`, as there is a collision risk!

---

# HTTP Parameters (2/2)

    !html
    GET /my/simple/uri?a=1&id=2 HTTP/1.1
    Host: example.org
    Content-Type: text/plain; charset=utf-8
    Content-Length: length

    b=3&city=paris

Will result in:

    !php
    $_GET     = [ "a" => 1, "id" => 2 ];

    $_POST    = [ "b" => 3, "city" => 'paris' ];

    $_REQUEST = [ "a" => 1, "id" => 2, "b" => 3, "city" => 'paris' ];

    $_SERVER['QUERY_STRING'] = "a=1&id=2";

    $HTTP_RAW_POST_DATA      = "b=3&city=paris";


**Important:** **never trust user input**, **never!**

---

# REST (REpresentational State Transfer)

REST is the underlying architectural principle of the web.

An API that adheres to the principles of REST does not require the client to
know anything about the structure of the API.
Rather, the server needs to provide whatever information the client needs to
interact with the service.

---

# Unified Resource Identifier

* URIs identify resources;
* URIs are format independent;
* URI "file extensions" != RESTful.

---

# Media Types

* Identifies a representation format;
* Custom types use `application/vnd.[XYZ]`;
* Used inside the `Accept` / `Content-Type` headers.

<table>
    <thead>
        <tr>
            <th>Header</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>`Content-Type`</td><td>HTTP message format</td></tr>
        <tr><td>`Accept`</td><td>HTTP response format preference</td></tr>
    </tbody>
</table>

---

# Content Type Negotiation

Content Type Negotiation is the principle to find appropriate response formats.

No standardized algorithm available, even if the Apache
[mod_negotiation](http://httpd.apache.org/docs/2.4/content-negotiation.html)
algorithm is documented. This also covers encoding (`Accept-Encoding`) and
language (`Accept-Language`) negotiation.

    !text
    Accept: application/json, application/xml;q=0.9, text/html;q=0.8,
        text/*;q=0.7, */*;q=0.5

<table>
    <thead>
        <th>Priority</th>
        <th>Mime Type</th>
    </thead>
    <tbody>
        <tr><td>`q=1.0`</td><td>`application/json`</td></tr>
        <tr><td>`q=0.9`</td><td>`application/xml`</td></tr>
        <tr><td>`q=0.8`</td><td>`text/html`</td></tr>
        <tr><td>`q=0.7`</td><td>`text/*` (ie. any text)</td></tr>
        <tr><td>`q=0.5`</td><td>`*/*` (ie. any media type)</td></tr>
    </tbody>
</table>

---

# Examples

### Resources

* `/bananas/joe`: _URI_ for banana "Joe"
* `/bananas/henry`: _URI_ for banana "Henry"

### Collections

* `/bananas`: collection of all available bananas

### Actions

* `GET /banana/joe` will return banana "Joe"
* `DELETE /bananas` will delete all bananas in the collection!
