# PHP: Hypertext Preprocessor

---

# History & Numbers

* Created by Rasmus Lerdorf
* 5th language in the world (TIOBE November 2012)
* 1st language for web development
* Running on 75% of all web servers

---

# Getting Started (1/2)

## Linux

    !bash
    $ sudo apt-get install php5

## Mac OS

    !bash
    $ brew install php

## Windows

![](images/y-u-no-use-linux.jpg)

---

# Getting Started (2/2)

The best solution is to use a Virtual Machine (VM):
[Vagrant](http://vagrantup.com/).

    !bash
    $ vagrant box add squeeze64 http://dl.dropbox.com/u/937870/VMs/squeeze64.box
    $ vagrant init squeeze64
    $ vagrant up

Then, ssh into your VM:

    !bash
    $ vagrant ssh

