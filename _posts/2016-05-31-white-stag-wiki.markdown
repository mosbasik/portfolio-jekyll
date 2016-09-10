---
layout: post
title: white stag wiki
categories: projects
disqus_identifier: cc21e3f4-ae65-48d4-8fce-e1dfbd96a1d6
excerpt: >
    This wiki is the continuation of my All-Out Guides project, designed to
    host information, guides and history for members of White Stag Exit Bag.
---


Hosted at: [wiki.whitestagexitbag.org](http://wiki.whitestagexitbag.org "White Stag Wiki")

Content hosted on this wiki reflects the views of the authors only and does not necessarily represent my [Peter Henry]'s views.

- - -


## Purpose

This wiki is the continuation of my [All-Out Guides]({% post_url 2015-11-23-all-out-guides %}) project, designed to host information, guides and history for members of [White Stag Exit Bag](https://evewho.com/alli/White+Stag+Exit+Bag).

[All-Out]: http://evewho.com/corp/all-out

- - -

## Planning


### Security

First and foremost, I needed a way to differentiate between different levels of information sensitivity.

When our group started playing Eve, we got a lot done with Google Documents, but it wasn't sustainable long term.

We didn't want to keep track of a a whole list of gmail address / eve player pairs, so we couldn't restrict visibility to certain email addresses.  This meant it wasn't safe to publish internal info on GDocs.

If we wanted people to contribute information, we had to make the docs publically editable - but because Google docs and sheets are so easy to edit, it was an invitation to vandalism (both from our members and externally).

Using a wiki allowed me to maintain strict control of users (naming them consistently was a big quality of life improvement) and the groups they were in / permissions they had.  Certain parts of the wiki are only visible to directors, others to specific corps, others to the whole alliance, and others to the public.  Also, I've found that the slight psychological barrier to editing significantly cuts down on vandalism: in a wiki, you click the "edit" button to start and the "save" button to end, compared to GDocs where you just start typing.



<figure class="right">
    <a href="/img/white-stag-wiki-sitemap.png">
        <img alt="White Stag Wiki Sitemap" title="White Stag Wiki Sitemap" src="/img/white-stag-wiki-sitemap.png" width="25%">
    </a>
    <figcaption>
        <p>Overview of the wiki's current namespaces.</p>
    </figcaption>
</figure>

### Structure

Information organization is a huge topic.  A site can have loads of information on a topic but if it's disorganized no one will try to read it.

One reason Wikipedia is so successful is because it has strict guidelines on article structure, notability requirements, etc.  It's _extremely_ well organized.

The only significant information that I knew I wanted on the wiki to start with was the guide information I'd already created - but all of that was essentially one "kind" of info: public, general purpose, and not sensitive.  Intuitively, all that information would probably end up in one place on the wiki.

Many discussions of wiki structure online suggest as flat a page heirarchy as possible, to simplify internal linking and make urls guessable.  Breaking up pages into folders (or namespaces, as DokuWiki calls the concept) is almost like making different wikis.  However, it's a lot easier to set permissions on a namespace and have them be applied to each of its pages (present and future) than it is to keep track of which set of permssions need to be applied to any given new page in the flat heirarchy.  It's a tradeoff between security and flexibility.

Eventually I decided to create three main namespaces: `Public` for anyone to see and for alliance affiliates to edit, `Private` for only alliance affiliates to see and edit, and `Bulletins` for alliance affilates to see but only directors to edit.  There are some subnamespaces, like `Private:Directors` which only directors can see or edit, and some extra namespaces for meta things like experimenting (`Playground`) or how-to's about dokuwiki itself (`Wiki`) and some leftover bits and pieces from experimenting.

It's grown somewhat organically from that framework, though now I can see some places that should be cleaned up.  For instance, `Bulletins` could be moved under `Private`.  The reason it's not yet is because we use a blogging plugin to publish bulletins and its default behavior is to use a root namespace.  Another issue is that the kind of thing that goes in `Public:History` is probably also going to appear in `Bulletins` (and also `Public:History` material is easiest to write while it's happening, but it's usually sensitive info while it's happening and shouldn't be publically viewable until after the fact).

Maintaining a wiki is, as always, an ongoing challenge.


<figure class="right">
    <a href="/img/white-stag-500-white.png">
        <img alt="White Stag Exit Bag Logo" title="White Stag Exit Bag Logo" src="/img/white-stag-500-white.png" width="25%">
    </a>
    <figcaption>
        <p>White Stag Exit Bag alliance logo.</p>
    </figcaption>
</figure>

### Visual


Since the wiki is an alliance-level asset and no longer specific to the All-Out corp, the flood of tangerine I used on the All-Out Guides didn't seem appropriate.


We have a nice logo one of our members created - mostly white with tangerine highlights.  White is literally part of the alliance name, so it seemed like the obvious choice for a background color.  Links seemed like a good place to use the highlight color.  Fortunately our yellow isn't _too_ bright to use on a white background, though sometimes I think it's getting there.

I was able to find a theme fairly quickly that satisfied most of my layout concerns.  The primary issue was finding one with good placement and design of the table of contents.  A lot of them wanted to collapse or scroll with the page, but were sluggish or broken on mobile or just broken in general.

If I had the time, I could probably write a reasonable theme myself or at least tweak an existing one - but I'm pretty happy with what we have now.

- - -

## Building Blocks

### [DokuWiki](https://www.dokuwiki.org)

I knew from the start I didn't want to write my own wiki engine, so I did quite a bit of research into what was available.

One of my favorite developers in the Eve Online community, [Lucia Denniard](https://github.com/andimiller), ran the (now somewhat defunct) [Confederation of xXPizzaXx Wiki](https://wiki.pizza.moe/) for a while.  I asked around and a Pizza director was nice enough to give me a temporary login to look through the internals.  I really liked what I saw; it seemed to have the right balance of simplicity and security that I wanted.

DokuWiki doesn't have a database backend; it uses plain text files to store its content - incredibly simple to install, keep backed up, etc.  It honestly took me less than an hour to install a basic, working wiki that my users could edit.  The time is in the tweaking, of course.  BUT - a large drawback with a file-based wiki is that renaming pages or moving them around to different namespaces breaks any links that referred to that page.  This makes restructuring your wiki much, much more time consuming.

DokuWiki manages security with an [ACL (Access Control List) system](https://www.dokuwiki.org/acl).  There are seven basic permissions (read/write/edit/etc) that can be granted to users/usergroups, and used as restrictions on pages/namespaces.  The various combinations of these allows very granular control over who can see and edit what.

#### Rejected Wiki Solutions

##### [MediaWiki](https://www.mediawiki.org)

The first engine I checked out, of course, was MediaWiki - what [Wikipedia](https://www.wikipedia.org/) runs on.  It's great software, but seemed like huge overkill for what I needed.  It has hundreds of settings and thousands of plugins, a strong focus on database caching, high throughput, etc.

Incidentally, the [Brave Newbies Wiki](https://wiki.braveineve.com/) (belonging one of highest-profile new player friendly alliances in Eve) _looks_ like it's running MediaWiki, but the favicon gives it away - they're actually running DokuWiki with a MediaWiki skin. :)

##### [Github Wiki](https://help.github.com/articles/about-github-wikis/)

Github offers a wiki solution to allow developers to publish more in-depth documentation than a readme file permits.  These wikis are simply git repositories, though, which come with some pros and cons.  All changes to Github Wikis are recorded in version control, and the same git workflow of clone/commit/push/pullrequest/merge etc applies - but this requires all contributors to have github accounts and  understand how to use git, etc.  This makes the barrier to editing quite high for the non-technical.  This was one thing I was trying to get away from by moving away from my Github Pages based [All-Out Guides]({% post_url 2015-11-23-all-out-guides %}).
