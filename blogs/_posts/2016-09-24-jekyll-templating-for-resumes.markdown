---
layout: post
title: jekyll templating for resumes
disqus_identifier: a18249c2-4ca3-4adc-aeaf-de9da659a22f
tags: resume jekyll github css responsive template yaml latex
excerpt: >
  Templating is the main thing I want for a resume-building solution.I want to
  be able to fill out what amounts to a pre-designed form for each category on
  my resume and have a template (that I only have to write once) handle
  rendering the content into something that looks pretty.
---


Templating is the main thing I want for a resume-building solution.  I want to be able to fill out what amounts to a pre-designed form for each category on my resume and have a template (that I only have to write once) handle rendering the content into something that looks pretty.  I don't want to have to write markup every time I add a piece of work experience.

Jekyll does all of this - it just needs to be tweaked a little bit to handle sections on a resume instead of pages on a website. I did some quick Googling to see what kind of Jekyll-based resume solutions are already out there.  Here are a couple:

[resume-template](https://github.com/jglovier/resume-template) (by [Joel Glovier](https://github.com/jglovier) from GitHub)

- Can choose whether or not to render a given section based on switches in the config file
- Basic information stored as key-value pairs in the config file
- Unfortunately, work experience and similar data stored as HTML markup in a .html file

[resumecards](http://ellekasai.github.io/resumecards/) (by [Elle Kasai](https://github.com/ellekasai) from Actcat)

- Basic information stored as key-value pairs in a custom config file, meaning fewer server restarts for quicker development
- Work experience stored in separate files in `_posts/`, allowing the use of front matter for each file
- Basic theming possible (colors)

I'm sure there are many others, but these were enough to give me some ideas.  Between these two, I like Elle's use of front matter a lot more, and the theming options she implemented make me think about going and looking through [CSS Zen Garden](http://www.csszengarden.com/) again.  I bet with smart templating, you could get some great flexibility as far as users being able to drop in their own stylesheets.

I think I'll start messing around and try to duplicate my current resume using Jekyll and see what kinds of results I'm able to get.

Even if the results are good, there are still some things I'd need to think about before I'd switch from my current resume.  I _really_ like LaTeX's text formatting!  It's a pleasure to read LaTeX documents.  Also, my resume has included a GitHub shortlink to its hosted version in my repository for a long time.  I don't really want to break that link - but before I used LaTeX/GitHub, I was using Google Docs, I had a Google shortlink, and I broke that shortlink when I upgraded.  The best solution is probably just to put it at `peterhenry.net/resume`, since I have full control of that path and I can make it forward to any other link as needed in the future.  I'll cross that bridge when I come to it, though.
