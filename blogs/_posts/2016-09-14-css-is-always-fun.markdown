---
layout: post
title: css is always fun
disqus_identifier: b35edeb5-0b4d-442b-baab-180ba0033962
tags: css bootstrap sass font fira-code theme solarized
excerpt: This place needs a styling overhaul.  The default bootstrap fixed container is too wide in fullscreen for comfortable reading and it always has been. I need to decide on the best way to narrow it.
---

This place needs a styling overhaul.

## Container Width

The default bootstrap fixed container is too wide in fullscreen for comfortable reading and it always has been. I need to decide on the best way to narrow it.

- I could manhandle a pixel width into my stylesheet.  Simple, but it would probably mess with the handy responsiveness that Bootstrap is giving me.  I love the way my site reflows on mobile.

- I could do something similar to above using the [`ch` css property](https://css-tricks.com/the-lengths-of-css/#article-header-id-11) to limit line length to something like 80 characters for maximum geekiness, but then I need to figure out how to make the navbar width follow suit.

- I could tweak Bootstrap's defaults with their [online customization tool](https://getbootstrap.com/customize) (and probably strip out quite a lot of the things I'm not using to cut load time) but that means I'd have to download it and unpack it a bunch of times to make it look how I want, and do it more whenever I want to change it down the road.

- Bootstrap is written in [Less](http://lesscss.org/).  There is a Jekyll plugin called [jekyll-less](https://rubygems.org/gems/jekyll-less) that permits Less compilation.  I have zero experience with Less, though, and my current styling is written in Sass.  I don't know if these would conflict without trying them.

- Jekyll supports [Sass](http://sass-lang.com/) natively, and all my current styling uses it - including my currently-defunct theme switching.  There is a [Sass port of Bootstrap](https://github.com/twbs/bootstrap-sass/tags), so maybe I should start using that.  I found a [fairly specific blogpost](http://veithen.github.io/2015/03/26/jekyll-bootstrap.html) detailing how to make bootstrap-sass play nice with Jekyll that looks promising.

## Font

I'm using the Apple-developed monospace font "Menlo" right now, and serving it from my server.  It's taking unacceptably long to load, and until it does finish loading my page is blank to a first time visitor.  Maybe I should switch to a font provided by a CDN and see if that helps performance.  [Daniel Morgan](http://danielmorgan.co.uk/) suggested [Fira Code](https://github.com/tonsky/FiraCode), which I'd never heard of - but it looks pretty fancy!

## Style Switching

The whole reason I used Solarized as a color scheme in the first place was because it had recognizable light and dark versions.  I had a switch to allow a user to swap between light and dark themes at will, which is currently broken because I moved from Django to Jekyll and now instead of rendering a template on page load, my templates are rendered when I update the site.

I can probably fix this with some Javascript.  When I first wrote this site I probably would have used JQuery - but now I'm tempted to use Vue.js.  I hate to load _another_ library, given that my Bootstrap is currently using JQuery - but some reading indicates that maybe that's not a hard dependency.  Sure would be nice to take JQuery out entirely.

- - -

## Edit (Sep 19)

Went with `bootstrap-sass`.  I lose the speed benefit of using a CDN, but I can cut down the number of Bootstrap features I import to cut the load size.

I'm really liking Fira Code so far.  Scattered serifs, circles instead of squares for the dots, and a shorter line length have significantly improved legibility.  A quick look through its info says it unfortunately doesn't work with `rxvt` or Sublime Text, my main text editors.  I'll have to look into that later, because that might be old information - it doesn't make sense for something like Sublime to not support ligatures, and I use `rxvt-unicode`, not the original `rxvt`, specifically so that I can use unicode characters.

For the style switching, I've done some testing with Vue and it looks like it will be _waaay_ too heavy for what I need.  Because my custom stylesheet doesn't load until after Vue loads, there's this really bad looking split second of default bootstrap before my themes are applied (which is even more noticeable because my dark theme is the default).  Probably going to go vanilla JS for this one; more work is needed.