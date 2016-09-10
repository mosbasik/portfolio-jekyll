readme
=============

This readme is a checklist of things to do to post an entry to my blog.  When I have time, I'll streamline my deployement process so it's all nice - but for now, I'll make do.

1. Create a new file in `_posts` named like this:

   ```
yyyy-mm-dd-title-for-url.markdown
```

1. Put the front matter at the top of the file: 

   ```
---
layout: post
title:
categories:
disqus_identifier:
excerpt:
---
```
  1. `title` is the title for display, not URL.

  1. `categories` is either `blogs` or `projects`.

  1. `disqus_identifier` is a new UUID (can be generated from the command line with `uuidgen`).  If this is removed, no Disqus comments section will be displayed.

  1. `excerpt` is 2-3 lines from the post to serve as the preview text for list views.

1. Commit changes, push changes to Github, ssh into the server

1. Run these commands on the server:

   ```
cd /var/www/html/portfolio-jekyll
sudo git pull
jekyll build
```

   Yeah, yeah, `sudo git pull` is a terrible idea.  To be fixed.  [Note to self.](http://ryansechrest.com/2013/08/managing-file-and-folder-permissions-when-deploying-with-git/)