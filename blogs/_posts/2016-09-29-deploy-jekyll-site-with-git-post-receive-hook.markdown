---
layout: post
title: deploy jekyll site with git post-receive hook
disqus_identifier: 5ba69116-40ea-4bf8-bbf7-5995ee7dba9a
tags: linux git github jekyll ruby rvm deploy ssh apache post-receive hook
excerpt:
---

I finally got a one-command method working for pushing updates to my Jekyll sites hosted on my VPS.  A lot of this material is informed by Jekyll's official [how-to about deploying with git post-receive hooks](https://jekyllrb.com/docs/deployment-methods/#git-post-receive-hook), but I encountered a few gotchas that I thought might be worth going into a bit more detail over.  The official how-to moves pretty fast.

Note: I'll prefix the terminal commands that run on your local machine with `laptop$` and on your server with  `server$`, to help keep things straight.



## Set up a "deployer" user on the server

### Create the user

```bash
server$ sudo useradd deployer   # create the user
server$ sudo passwd deployer    # set the user's password
```
Make the password strong (14 characters, characters [A-Za-z0-9]); you won't be typing it much.

### Install Jekyll for deployer

You might have Ruby pre-installed on the system or otherwise not need to do this, but if you don't, I recommend using RVM to install Ruby, which you need in order to install Jekyll.  Here are the [RVM installation instructions](https://rvm.io/rvm/install).  They should be kept up-to-date.

If you don't want to read through those, here is the short version (i.e., what worked for me).  Run these one at a time while logged into `deployer` and in its home directory (`~`).

```bash
server$ \curl -sSL https://get.rvm.io | bash    # download and run the RVM install script
                                                #   (might take some time to compile / install)
server$ rvm list known                          # lists available ruby versions, choose one
server$ rvm install 2.3.1                       # most recent stable version when I wrote this
                                                #   (might take some time to compile / install)
server$ rvm use 2.3.1 --default                 # activate & set as default the version you chose
server$ gem install jekyll                      # install Jekyll and its dependencies
```




## Set up SSH authentication

### Add your server's IP to your local hosts file

Open `/etc/hosts` on your laptop with `sudo` privs and add a line like this to it:

```bash
123.456.789.123 linode
```
This maps the hostname `linode` (or whatever you put there - I have a Linode VPS) to this IP address as far as your laptop is concerned.  Anywhere you used to type `123.456.789.123` on your laptop, you can now type `linode`.  For example, try logging into your new deployer user:

```bash
laptop$ ssh deployer@linode
```

### Make sure you have an SSH key

GitHub has a great set of guides on how to create SSH keys.  Follow the information on these two pages to get set up with an SSH key or to find out if you already have one:

- [GitHub: Checking For Existing SSH Keys](https://help.github.com/articles/checking-for-existing-ssh-keys/)
- [GitHub: Generating a New SSH Key and Adding It to the SSH Agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

### Add your SSH key to deployer's trusted keys

```bash
laptop$ ssh-copy-id deployer@linode
```
You will be prompted for `deployer`'s password to confirm.

Once this is complete, you should be able to log directly into the deployer user from your laptop using `ssh deployer@linode` without encountering a password prompt.



## Set up the remote repo

Say your project is named ACME.  Login to the server as `deployer` and run these commands:

```bash
server$ mkdir ~/acme                # create repo folder in deployer's home
server$ cd ~/acme                   # enter it
server$ git --bare init             # make it into a bare git repo
server$ nano hooks/post-receive     # create and open the blank hook in a text editor
```

Paste this into the post-receive hook script:

```bash
#!/bin/bash

source ~/.rvm/scripts/rvm       # loads RVM environment variables needed to call Jekyll

GIT_REPO=$HOME/acme
TMP_GIT_CLONE=$HOME/tmp/acme
PUBLIC_WWW=/var/www/html/acme/_site

# when the hook fires:
# - clone the repo to a temp location
# - build the jekyll site from the temp location and into the server folder
# - remove the temp repo

git clone $GIT_REPO $TMP_GIT_CLONE
jekyll build -s $TMP_GIT_CLONE -d $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE

exit
```

And run this to make the hook executable:

```bash
server$ chmod +x hooks/post-receive
```



## Set up Apache

### Make the public html folder

```bash
server$ sudo mkdir /var/www/html/acme                           # create the folder
server$ sudo chown -R deployer:deployer /var/www/html/acme      # give the deployer full ownership
```

### Make the Apache vhost file

Of course, there are any number of ways to set this up and it's a bit out of the scope of this post to describe how to get a web server configured - but this is an example vhost that I used with this deployment method.  Make sure that the main Apache configuration file knows where to find this vhost file so it can load it.


```conf
<VirtualHost *:80>

        ServerName example.com
        ServerAlias acme.example.com

        DocumentRoot "/var/www/html/acme/_site"

        ErrorLog "/var/www/html/acme/error_log"
        CustomLog "/var/www/html/acme/access_log" combined

        <Directory /var/www/html/acme/_site>
                AllowOverride All
                Allow from all
                Require all granted
        </Directory>

</VirtualHost>
```

There's a way to do this with nginx, but I'm not familiar with nginx yet so you'll have to explore to find it.



## Add server repo to local repo as a remote

Set this up on any machine that needs to be able to push updates to the website:

```bash
laptops$ git remote add deploy deployer@linode:~/acme
```

## And you're done!

To update your website, just run this command from your local repo:

```bash
laptop$ git push deploy master
```

Note: You need to push `master` to the `deploy` remote at least once in order to get things moving on the server.

For debugging, I made a `debug` branch so I could put garbage commits on it and push them as I tweaked parts of my setup (something I recommend you do if you have troubles getting pieces of this tutorial to talk to each other).  However, it wasn't until I had pushed `master` at least once that it allowed me to push commits to the `debug` branch.