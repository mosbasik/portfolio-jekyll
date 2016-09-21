---
layout: post
title:  portfolio
disqus_identifier: f7438ffc-52c1-496f-b8f2-bf8e112695ec
tags: python django sqlite bootstrap sass solarized markdown django-markupfield python-markdown codehilight pygments
excerpt: This project is running my personal website.  As I got to the end of my time at Coding Campus, I realized I really needed a unified place to showcase the different things I've been working on.
---

Hosted at: [http://peterhenry.net/](http://peterhenry.net/ "Peter Henry's Blog")

Source code: [https://github.com/mosbasik/portfolio](https://github.com/mosbasik/portfolio "A portfolio of my notable work")

- - -

Purpose
-------

This project is running my personal website.  As I got to the end of my time at [Coding Campus](http://codingcamp.us/ "Coding Campus: Become a web developer in as little as 12 weeks!"), I realized I really needed a unified place to showcase the different things I've been working on.

- - -

Options
-------

GitHub is nice, but it's hard to find my more interesting projects/extended projects because of the dilution from small, specific repos that I throw up there just to have them in version control - like my Linux config files or my Project Euler work, etc.

I've blogged with Tumblr, Wordpress, and Blogspot before, but it was never a very pleasant experience.  Didn't have enough control over the environment and had to bend over backwards to be able to do certain things - not to mention the domain stigma.

So I figured, why not roll my own blog platform?  I knew enough to be able to get something up and running fairly quickly, I could make all my own design choices, and it would provide a different problem space to attack compared to the projects I'd been working on.

- - -

Planning
-------------

### Visual

- Flat, minimal aesthetic: no borders, drop shadows, rounded corners, gradients, etc.
- A visual design that clearly indicates that I enjoy messing around in tech, for both work and play.

### Structural

- Landing page with some brief information about me and the most recent entries from my blog and projects
- List of blog entries
    - Paginatation?
    - Filtering on year/month?
- List of personal projects
- "About" page with a bit more info about me and links to my various profiles 

- - -

Building Blocks
---------------

### [Django](https://www.djangoproject.com/ "Django: The Web framework for perfectionists with deadlines")

Obvious choice while at a Python/Django bootcamp.

I found [Django CMS](http://www.django-cms.org/en/ "Django CMS: The easiest way to build and manage your Django projects") while thinking about how to submit and display my content, and briefly considered using it if only to try something different.  Once I got it installed and started playing with it, though, I realized just how heavy it was and decided to stick with vanilla Django for a small project like this.


### [SQLite](https://www.sqlite.org/ "Sqlite: Small. Fast. Reliable.")

This site isn't meant to handle multiple users simultaneously contributing or crunching data, so SQLite is an appropriate and simple choice.


### [Bootstrap](http://getbootstrap.com/ "Bootstrap: The world's most popular mobile-first and responsive front-end framework")

I have some experience in Bootstrap and had some boilerplate ready to go, so I decided to use the Bootstrap grid and navbar implemenations.

It is a little heavy, given that I intended to override most of the styling.  At some point I do want to try some of the other frameworks out there that offer only the grid without any bundled extras, and/or make my own grid.


### [SASS](http://sass-lang.com/ "SASS: CSS with superpowers")

I hadn't used SASS before this project, and now that I have, I don't think I'll be able to go back to normal CSS.  Inherited rules are just so intuitive and easy to write.

Since it was my first time trying it, I decided to avoid using the popular [Compass](http://compass-style.org/ 'Compass: Open-Source CSS Authoring Framework') framework and simply use the base SASS preprocessor functions included on installation.  To manage caching and compiling my static source files I used [Django Compressor](https://github.com/django-compressor/django-compressor 'Django Compressor: Compresses linked and inline JavaScript or CSS into a single cached file').

Reading up on the capabilites of SASS `@include` statements inspired me to attempt toggleable light and dark themes.


### [Solarized](http://ethanschoonover.com/solarized "Solarized: Precision colors for machines and people")

I'm not the greatest at color theory and design, so I decided to leverage one of the most popular, well designed and recognizable light/dark themes around.  Since Solarized is most well known as an IDE/text-editor theme, I decided to use a text-editor style, monospaced, matte look on the whole site.

In order to implement persistant toggleable theming without having registered users, I had to learn how to use cookies in conjunction with Django's `middleware` app.


### [Markdown](http://daringfireball.net/projects/markdown/ "Markdown: Text-to-HTML conversion for web writers")

I needed some means of controlling the formatting and structure of my content.  Django CMS provided a WYSIWYG interface for content creation, but I didn't want that kind of overhead.  I also felt like I wouldn't have enough control over the markup produced by that kind of plugin.

Markdown was a natural choice, given my existing text-editor asthetic.  With this, I could write most of my content as plain text with simple markup directives - but if necessary, I could also use valid HTML to include image or video elements.

Getting the functionality I wanted from Markdown turned to be a somewhat involved process, and I'll likely be adding more extensions later as I need them.  These are the libraries I'm using so far:

#### [Django MarkupField](https://github.com/jamesturk/django-markupfield "An implementation of a custom MarkupField for Django")

This Django app manages storing the raw and processed versions of a markdown field, as well as caching and automatically updating the processed version when the raw version is modified.  It's a wrapper that allows custom markdown processors to be used, including:

#### [Python Markdown](https://pypi.python.org/pypi/Markdown "A Python implementation of John Gruber’s Markdown")

This Python library manages the actual parsing of markdown source text into HTML.  It's very extensible, and several modules are included on installation that add commonly used functionality not defined in Gruber's original markdown spec.  Currently I'm only using one of them:

#### [CodeHilite](https://pythonhosted.org/Markdown/extensions/code_hilite.html "CodeHilite: adds code/syntax highlighting to standard Python-Markdown code blocks")

This extension adds code/syntax highlighting to Python Markdown code blocks by leveraging the Pygments library:

#### [Pygments](http://pygments.org/ "Pygments: Python syntax highlighter")

This Python library is a generic syntax highlighter that works by parsing the input and breaking it up in to `<span>` tags with specific classes.  Language can be specified in the input or determined heuristically, and there are a number of bundled highlighting themes that can be exported to the CSS.

#### [Dark Solarized SASS Stylesheet](https://github.com/mohsen1/mohsen1.github.io/blob/master/_sass/_syntax-highlighting.scss)

Solarized isn't included as a default Pygment theme, though, and I wanted my codeblocks to match the rest of my site.

I found [this gist](https://gist.github.com/nicolashery/5765395 "Solarized theme stylesheets for Jekyll and Pygments") with Solarized themed Pygment stylesheets, but they were in pure CSS and would have required significant reworking to fit with my theming logic.

Fortunately one of the commenters on that gist had created a SASS version of the dark Solarized theme.  That source file was fairly simple to rework into a form that would work for both of my themes.
