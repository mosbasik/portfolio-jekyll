---
layout: post
title: all-out guides
disqus_identifier: dbb08230-2605-41ed-ab08-7890cb8820ff
excerpt: >
    For the time being, this is where reference material for setting up new
    members of All-Out is going to be hosted.  As content is written that
    expands beyond simply 'guides', the structure may be reworked and URLs may 
    change.
---


Hosted at: [all-out.github.io/guides](http://all-out.github.io/guides/ "All-Out Guides")

Source code: [github.com/all-out/guides](https://github.com/all-out/guides "All-Out Guides Source")


EDIT: I'm no longer updating this project and have migrated the information it contained to a wiki.  Refer to the [White Stag Wiki]({% post_url 2016-05-31-white-stag-wiki %}) project page for more info.

- - -


## Purpose

For the time being, this is where reference material for setting up new members
of [All-Out] is going to be hosted.  As content is written that expands beyond
simply 'guides', the structure may be reworked and URLs may change.

[All-Out]: http://evewho.com/corp/all-out

- - -

## Planning


<figure class="right">
    <a href="/img/all-out.png">
        <img alt="All-Out Logo" title="All-Out Logo" src="/img/all-out.png" width="25%">
    </a>
    <figcaption>
        <p>All-Out's corporate logo.</p>
    </figcaption>
</figure>

### Visual

All-Out's founder, [Big Pi], established the visual aesthetic of our branding
when he created the corporation logo using the tools available within the game.
"Swedish Design" - flat colors, blocky shapes and sans-serif fonts.  The
principle colors are tangerine and cream, with black and blue elements for
readability, contrast, and accenting.

[Big Pi]: http://evewho.com/pilot/Big+Pi

### Structural

At the moment, the site is simply a landing page with a list of links to the
individual pages of each guide.  There are more complex features planned,
though:

- Author pages, where all the guides written by a given author are visible
- Tags, to allow browsing lists of guides by subject matter
- Categories (possibly implemented via Jekyll collections), to display
    - Guides
    - Fits
    - News posts / blogs
    - Stats (like the original [death counter](http://allout.pro/) on the original website) 

- - -

## Building Blocks

### [Jekyll](http://jekyllrb.com/)

This is a static site generator written in Ruby.  Perfect for content-oriented
sites without a lot of need for dynamic behavior. I've been wanting to get more
familiar with Jekyll for a while, and after converting my blog to it, I think
I'm in love.

The templating language is very flexible, and the recent
introduction of "collections" is the secret sauce needed to kick Jekyll up from
a blogging platform to an almost-completely general-purpose web platform.

I've never used Ruby before, but so far I've been getting along remarkably well
without needing to write a line of it myself.  Of course, if I ever need to
write a custom plugin for this project that will change - but that would also
mean needing to compile the site locally, which isn't really an option given
how the site is planned to be used.

#### [GitHub Pages](https://pages.github.com/)

This amazing free service by GitHub serves static files from your repositories
as webpages.  Though not required, Jekyll support is built in - meaning that I
can teach people how to contribute content using GitHub's web-based file editor
to a Jekyll-based site.  Look mom, no command line!

#### [kramdown](http://kramdown.gettalong.org/)

This is a superset of [Markdown](https://daringfireball.net/projects/markdown/)
and the default content parser used by Jekyll.  It shares several features with
GitHub-flavored Markdown (notably tables and code highlighting), along with
several other handy features like abbreviation expansions (ROUS) and definition
lists.

*[ROUS]: Rodents Of Unusual Size


### [Bootflat](http://bootflat.github.io/)

This is a simple [Bootstrap](http://getbootstrap.com/) theme that flattens out
many of the elements and tweaks the colors a bit.

I haven't yet completely settled on the styling of the site - how to deal with
code blocks and images spring to mind, as well as certain font choices - but
Bootflat has proved to be an ok place to start.

We'll see how things evolve.
