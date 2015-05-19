# Translations

---

# Definitions

### Internationalization

The term **internationalization** (often abbreviated **i18n**) refers to the
process of **abstracting strings and other locale-specific pieces** out of your
application and **into a layer where they can be translated** and converted
**based on the user's locale** (i.e. language and country).

### Localization

The act of creating translation files is an important part of **localization**
(often abbreviated **l10n**). It is the **process of adapting a product or
service to a particular language**, **culture**, and desired local
**look-and-feel**.

---

# Using the `translator` Service

    !yaml
    # messages.fr.yml
    Symfony is great: J'aime Symfony
    'Hello %name%': Bonjour %name%

When the following code is executed, Symfony will attempt to translate the
message `Symfony is great` based on the locale of the user:

    !php
    echo $this->get('translator')->trans('Symfony is great');

Now, if the language of the user's locale is French (e.g. `fr_FR` or `fr_BE`),
the message will be translated into `J'aime Symfony`.

### Message Placeholders

    !php
    echo $this->get('translator')->trans('Hello %name%', [
        '%name%' => 'Will'
    ]);

    // French:  Bonjour Will
    // Default: Hello Will

---

# The Translation Process

To translate the message, Symfony uses a simple process:

1. The locale of the current user, which is stored on the request (or stored as
`_locale` on the session), is determined;

2. A catalog of translated messages is loaded from translation resources defined
for the locale (e.g. `fr_FR`). Messages from the fallback locale are also loaded
and added to the catalog if they don't already exist. The end result is a large
"dictionary" of translations;

3. If the message is located in the catalog, the translation is returned. If not,
the translator returns the original message.

When using the `trans()` method, Symfony looks for the exact string inside the
appropriate message catalog and returns it (if it exists).

---

# Locations and Naming Conventions

Symfony looks for message files (i.e. translations) in the following locations:

* the `<kernel root directory>/Resources/translations` directory;
* the `<kernel root directory>/Resources/<bundle name>/translations` directory;
* the `Resources/translations/` directory of the bundle.

The filename of the translations is also important as Symfony uses a convention
to determine details about the translations. Each message file must be named
according to the following path: `domain.locale.loader`:

* `domain`: an optional way to organize messages into groups;
* `locale`: the locale that the translations are for (`en_GB`, `en`, etc);
* `loader`: how Symfony should load and parse the file (`xliff`, `php` or `yml`).

---

# Pluralization

When a translation has different forms due to pluralization, you can provide all
the forms as a string separated by a pipe (`|`):

    !jinja
    'There is one apple|There are %count% apples'

To translate pluralized messages, use the `transChoice()` method:

    !php
    $t = $this->get('translator')->transChoice(
        'There is one apple|There are %count% apples',
        10,
        array('%count%' => 10)
    );

The second argument (`10` in this example), is the **number of objects being
described** and is used to determine which translation to use and also to
populate the `%count%` placeholder.

---

# Explicit Interval Pluralization

Sometimes, you'll need more control or want a different translation for specific
cases (for 0, or when the count is negative, for example). For such cases, you
can use explicit math intervals:

    !jinja
    '{0} There are no apples|{1} There is one apple|]1,19] There are
    %count% apples|[20,Inf[ There are many apples'

The intervals follow the [ISO 31-11](http://en.wikipedia.org/wiki/Interval_(mathematics)#Notations_for_intervals)
notation.

An Interval can represent a finite set of numbers:

    !jinja
    {1,2,3,4}

Or numbers between two other numbers:

    !jinja
    [1, +Inf[
    ]-1,2[

---

# BazingaJsTranslationBundle

    !yaml
    # app/Resources/translations/Hello.fr.yml
    ba:
        bar:      Bonjour.
    place.holder: Bonjour %username%!
    plural:       Il y a %count% pomme|Il y a %count% pommes

<p></p>

    !html+jinja
    <script src="{{ url('bazinga_jstranslation_js', { 'domain': 'Hello' }) }}">
    </script>

A `Translator` object is now available in your JavaScript:

    !javascript
    Translator.trans('ba.bar', {}, 'Hello', 'fr');
    // "Bonjour."

    Translator.trans('place.holder', { "username" : "Will" }, 'Hello');
    // "Bonjour Will!"

    Translator.transChoice('plural', 1, { "count": 1 }, 'Hello');
    // "Il y a 1 pomme"

    Translator.transChoice('plural', 10, { "count": 10 }, 'Hello');
    // "Il y a 10 pommes"
