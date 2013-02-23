# Service Container

---

# Definitions

### What is a Service?

A **Service** is a generic term for any PHP object that performs a specific task.

A service is usually used "globally", such as a database connection object or an
object that delivers email messages.

In Symfony2, services are often configured and retrieved from the service
container. An application that has many decoupled services is said to follow a
**service-oriented architecture**.

### What is a Service Container?

A **Service Container**, also known as a **Dependency Injection Container**
(DIC), is a special object that manages the instantiation of services inside an
application.

Instead of creating services directly, the developer trains the service
container (via configuration) on how to create the services.
The service container takes care of lazily instantiating and injecting dependent
services.

---

#
