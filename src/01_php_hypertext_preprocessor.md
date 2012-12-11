# PHP: Hypertext Preprocessor

---

# History & Numbers

* Created by Rasmus Lerdorf
* 5th language in the world (TIOBE November 2012)
* 1st language for web development
* Running on 75% of all web servers

---

# Getting Started

## Linux

    !bash
    $ sudo apt-get install php5-common libapache2-mod-php5 php5-cli

> [http://php.net/manual/en/install.unix.debian.php](http://php.net/manual/en/install.unix.debian.php)

---

# Getting Started

## Mac OS X

    !bash
    $ curl -s http://php-osx.liip.ch/install.sh | bash -s 5.4

> [http://php-osx.liip.ch/](http://php-osx.liip.ch/)

---

# Getting Started

## Windows

![](images/y-u-no-use-linux.jpg)

> [http://www.php.net/manual/en/install.windows.installer.msi.php](http://www.php.net/manual/en/install.windows.installer.msi.php)

---

# Getting Started

The best solution is to use a Virtual Machine (VM):
[Vagrant](http://vagrantup.com/) to the rescue!

* Works on all platforms;
* Uses VirtualBox under the hood;
* Lightweight, reproductible, portable dev environments.

3 steps to run a VM:

    !bash
    $ vagrant box add <name> <url>
    $ vagrant init <name>
    $ vagrant up

> Debian **Squeeze 32**:
> [http://mathie-vagrant-boxes.s3.amazonaws.com/debian_squeeze_32.box](http://mathie-vagrant-boxes.s3.amazonaws.com/debian_squeeze_32.box).

Then, ssh into your VM:

    !bash
    $ vagrant ssh

---

# Resources


---

# RTFM: [http://www.php.net](http://www.php.net)
