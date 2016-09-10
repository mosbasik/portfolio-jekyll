readme
=============

This readme is a checklist of things to do to post an entry to my blog.  When I have time, I'll streamline my deployement process so it's all nice - but for now, I'll make do.

1. Create a new file in `_posts` named like this: `yyyy-mm-dd-title-for-url.markdown`

1. Put the front matter at the top of the file: 

   ```---
layout: post
title: title for display
categories:
disqus_identifier:
excerpt:
---```

    `categories` is either `blogs` or `projects`

    `disqus_identifier` is a new UUID (can be generated from the command line with `uuidgen`)

    `excerpt` is 2-3 lines from the post to serve as the preview text in list views

1. Commit, push to Github, ssh into server

1. ```cd /var/www/html/portfolio-jekyll
sudo git pull
jekyll build```

Yeah, yeah, `sudo git pull` is a terrible idea.  To be fixed.  [Note to self](http://ryansechrest.com/2013/08/managing-file-and-folder-permissions-when-deploying-with-git/)