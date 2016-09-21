---
layout: post
title: markdown in django
disqus_identifier: 113e9942-0121-4f9e-8319-3e7ec27ee137
tags: python django markdown portfolio
excerpt: I spent most of today refactoring the models for my personal site in order to use Markdown to format a lot of my static content.
---

I spent most of today refactoring the models for my personal site in order to use Markdown to format a lot of my static content.

While I was experimenting with the layout of the Welcome and About pages, I started tweaking my column behaviors at different screen widths.  I realized that although Bootstrap's push-pull classes gave me a lot of what I wanted, I would need to write two `div`s with duplicate content and show/hide one or the other at different widths in order to get the content splitting effect I had in mind.

Writing identical HTML for two format-rich `div`s and _keeping_ them identical over time sounded like a terrible idea; I needed to be able to drop in a template tag in two places and have the HTML take care of itself.  And in order to do that, I needed to get my static content in my database somehow.

I had designed my database around `Blog` and `Project` models, which are nearly identical subclasses of my `Entry` model (if I were writing my own admin interface, I would probably have just put a choice field on `Entry` with blog/project options to distinguish them - but I'm using the Django Admin console, so subclassing the different kinds of posts allows me to easily split the two groups of entries into their own pages of the console without having to dig into customizing Django Admin).

But this design meant that in order to store formatted Markdown, it needed to be associated with either a `Blog` or a `Project` object, and I wanted to be able to write Markdown associated with neither.

So, I wrote two new classes:

``` python
# This is my new base class; it provides created/modified timestamp fields and
# a Markdown body field (managed by Django- MarkupField).
class MarkupBlock(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    body = MarkupField(markup_type='custom_markup', null=True, blank=True)

# This is a subclass of `MarkupBlock` that simply adds a unique, identifying
# name to a given block of Markdown text.
class TextBlock(MarkupBlock):
    name = models.CharField(max_length=255, unique=True)
```

I also set `Entry` to be a subclass of `MarkupBlock` and removed all the now-redundant fields, leaving this:

``` python
# This class provides a non-unique title field, a unique slug, a display date,
# and a toggle for whether or not the entry is publically displayed.
class Entry(MarkupBlock):
    title = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='title')
    display_date = models.DateTimeField()
    display = models.BooleanField(default=False)
```

The `Blog` and `Project` subclasses remain unchanged.

With the new model structure, I can now write Markdown source in Django Admin and store it in a TextBlock object with a unique name.  In a view, I load the object into a context variable using a query on that name, and then it's available to use in my templates:

``` html
<h1>About Me</h1>
<div class="row">
    <div class="col-md-6 col-md-push-6">
        {{ contact_info.body }}             <!-- textblock "contact_info" -->
    </div>
    <div class="col-md-6 col-md-pull-6">
        {{ overview.body }}                 <!-- textblock "overview" -->
    </div>
</div>
```

Of course, by making static parts of my website live in my database, it means that on a fresh deployment of the website, I'm missing large chunks of it until I explicitly create those objects.

The best way to fix that is to make a loading script, and that's on my to-do list.  But in the meantime, given that fresh deployments aren't (shouldn't!) be common, I just wrote a static `get` method on the `TextBlock` model that handles all requests for `TextBlock`s and fails nicely if a requested object does not exist:

``` python
@staticmethod
def get(name, heading=None):
    block_heading = '' if heading is None else heading
    try:
        return TextBlock.objects.get(name=name)
    except TextBlock.DoesNotExist:
        textblock, created = TextBlock.objects.get_or_create(
            name='_default_%s' % name,
            body='%s\n\nSection is under development.' % block_heading
        )
        return textblock
```
