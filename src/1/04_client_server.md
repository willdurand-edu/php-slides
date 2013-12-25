# Client/Server

---

# Client/Server Basics

A typical **client/server** request follows this pattern:

![](../images/client-server.png)

* **Client**: Hello _server_, give me the _resource_ at `URI`.
* **Server**: Here is the resource at `URI`:<br />

    `> Content`

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

Also, **never trust user input**, **never!**

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

---

# REST (REpresentational State Transfer)

Each URI represents a unique **resource** that can be formatted as requested in
`json`, `xml`, or `html`.

* `/bananas/joe`: _URI_ for banana "Joe";
* `/bananas/henry`: _URI_ for banana "Henry".

Those resources are organized into collections:

* `/bananas`: collection of all available bananas.

So it makes sense to use HTTP verbs to execute an action:

> `GET /banana/joe` will return banana "Joe".

And:

> `DELETE /bananas` will delete all bananas in the collection!
