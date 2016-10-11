---
layout: post
title: let's encrypt on apache & centos 7
disqus_identifier: a2bbb11a-3f90-45de-be14-467c6859a998
tags: lets-encrypt certbot webroot standalone centos centos-7 apache vhost qualys-ssl-labs mozilla cron
excerpt:
---

I saw the [HTTP vs HTTPS Test](https://www.httpvshttps.com/) website earlier this week and was blown away by the performance jump between HTTP 1.1 and SPDY on a TLS-encrypted connection.  With the introduction of [Let's Encrypt](https://letsencrypt.org/) a few years ago, you no longer need to buy security certificates in order to provide a secure connection to your site - so I decided to see how long it would take me to switch my blog to HTTPS.

The first tutorial I tried was DigitalOcean's [How to Secure Apache with Let's Encrypt on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-centos-7).  Since Let's Encrypt apparently prefers (requires?) separate domains to be configured with separate virtualhost .conf files, that tutorial spends a lot of time explaining how to set up your vhosts, which I had already done.

## Step 1 - Server Dependencies

Install access to the EPEL repository and install the `mod_ssl` Apache module (prerequisites for the Let's Encrypt client program `certbot`):
```
$ sudo yum install epel-release mod_ssl
```

## Step 2 - Let's Encrypt Client

Install `certbot` from the EPEL repo that you now have access to:
```
$ sudo yum install certbot
```
Note: this only installs the basic `certbot` client.  If you want to get the Apache plugin, install the `python-certbot-apache` package as well.  I was not able to get automated Apache certificate installation to work, so I used the `webroot` method instead (which only requires the basic client; no plugins).

## Step 3 - Obtain the Certificate

The step of actually getting the certificate from Let's Encrypt is quite easy, but this is where I depart from most of the guides I've found.  The automatic Apache plugin method didn't work for me.  [This thread](https://community.letsencrypt.org/t/failed-to-connect-to-x-x-x-x-443-for-tls-sni-01-challenge/17346) on the Let's Encrypt forums describes my problem exactly, and I didn't feel like contacting my ISP to fix the issue like the guy in that thread apparently did.  So, I tried a few things and what eventually worked best was the `webroot` method:
```
$ sudo certbot certonly --webroot -w /var/www/html/portfolio-jekyll/_site -d peterhenry.net -d www.peterhenry.net
```

Some breakdown of what this is doing:
- `certonly` obtains the certificate, but makes no attempt to install it anywhere for you
- `--webroot` specifies the ownership verification method you want to use
- `-w /path/to/webroot` the website root of the domain(s) the certificate is for
- `-d example.com` a domain name that the certificate needs to cover (repeat if more domains/subdomains are needed)

If you want more in-depth explaination, examples, and caveats, check out the [official webroot documentation](http://letsencrypt.readthedocs.io/en/latest/using.html#webroot) (other verification methods are documented on the same page if you want to get an idea of what else is possible).

After you run the command, you should get screens asking to confirm that you've read the terms of service and asking for an email that can be used for expiration reminders.  Please note that the email on a signed certificate cannot be changed (though you can simply issue a new certificate if you need to change the email).  You can of course change the email address stored in the Let's Encrypt configs used to make new certificates whenever you like.

When you are done, you should get something similar to this success message:

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/peterhenry.net/fullchain.pem. Your cert
   will expire on 2017-01-08. To obtain a new or tweaked version of
   this certificate in the future, simply run certbot again. To
   non-interactively renew *all* of your certificates, run "certbot
   renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

### Side Info About How Let's Encrypt Manages Certificates

This isn't essential to the installation process so you can skip to Step 4 if if you want.  But, if you want to know a little more about how Let's Encrypt lays things out, read on!

At this point, your `/etc/letsencrypt` directory structure should look something like this:

```
/etc/letsencrypt
├── accounts
│   ├── acme-staging.api.letsencrypt.org
│   │   └── directory
│   │       └── 5a9e0508f2c3571cd1c635d0244deb2a
│   └── acme-v01.api.letsencrypt.org
│       └── directory
│           └── 9c836162b586a440e14996d6ec2fb753    <-- stores owner account information
├── archive
│   └── peterhenry.net  <-- Stores domain certificate history long term
├── csr
├── keys
├── live
│   └── peterhenry.net  <-- Stores domain active certificates as symbolic links to archive
└── renewal             <-- Stores the renewal method of each cert (defaults to creation method)
```
And the contents of `/etc/letsencrypt/live/peterhenry.net` should look like this:
```
lrwxrwxrwx 1 root root   38 Oct  7 22:54 cert.pem -> ../../archive/peterhenry.net/cert1.pem
lrwxrwxrwx 1 root root   39 Oct  7 22:54 chain.pem -> ../../archive/peterhenry.net/chain1.pem
lrwxrwxrwx 1 root root   43 Oct  7 22:54 fullchain.pem -> ../../archive/peterhenry.net/fullchain1.pem
lrwxrwxrwx 1 root root   41 Oct  7 22:54 privkey.pem -> ../../archive/peterhenry.net/privkey1.pem
```

Let's break down what each of these files is:
- `cert.pem` contains your domain's certificate: a block of text set off with `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` blocks.

- `chain.pem` contains the intermediate certificate(s) that signed your certificate.  In my case, there is a single intermediate (signed by Let’s Encrypt Authority X3) and so there is a single block of text in this file set off with `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` blocks just like in `cert.pem`.

- `fullchain.pem` is quite simply your certificate and the intermediate certificate(s) concatenated together into a single file.

- `privkey.pem` is your private key and should be protected as much as possible: a block of text set off with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`.  Never paste this key anywhere online or expose it to the public, and restrict access to it by users on your server as much as possible.

Note that all four files are symbolic links to actual files in the `archive/peterhenry.net` directory.  This is so that if the certificate expires, the links can be removed from the `live` directory but the certificate info will remain in the archive for future reference.

If you are curious how certificate chaining works with Let's Encrypt, check out their page about the [Chain of Trust](https://letsencrypt.org/certificates/).

## Step 4 - Create Secure and Plaintext VHosts

My old vhost opening tag listened for traffic on port 80, like this: `<VirtualHost *:80>`.

We need to set up two vhosts - one that will listen for secure traffic on port 443 and one that intercepts plaintext traffic on port 80 and redirects it to the secure port.  We can do this in the same `.conf` file, no problem:

```
<VirtualHost *:80>
        ServerName peterhenry.net
        Redirect / https://peterhenry.net/
</VirtualHost>

<VirtualHost *:443>
        ServerName peterhenry.net
        ServerAlias peterhenry.net www.peterhenry.net

        DocumentRoot "/var/www/html/portfolio-jekyll/_site"

        ErrorLog "/var/www/html/portfolio-jekyll/error_log"
        CustomLog "/var/www/html/portfolio-jekyll/access_log" combined

        <Directory /var/www/html/portfolio-jekyll/_site>
                AllowOverride All
                Allow from all
                Require all granted
        </Directory>
</VirtualHost>
```

## Step 5 - Point the VHost to the Certificate

We need to indicate to Apache where to find your new certificates.  There are two ways of doing this, depending on your version of Apache, so find out what version you have with this:
```
$ apachectl -v
```

### Old Style (Apache Version <= 2.4.8)

Put these lines inside your secure vhost:

```
SSLCertificateFile      /etc/letsencrypt/live/peterhenry.net/cert.pem
SSLCertificateKeyFile   /etc/letsencrypt/live/peterhenry.net/privkey.pem
SSLCertificateChainFile /etc/letsencrypt/live/peterhenry.net/chain.pem
```

### New Style (Apache Version >= 2.4.8)

Put these lines inside your secure vhost:
```
SSLCertificateFile      /etc/letsencrypt/live/peterhenry.net/fullchain.pem
SSLCertificateKeyFile   /etc/letsencrypt/live/peterhenry.net/privkey.pem
```
The directive `SSLCertificateChainFile` was deprecated in 2.4.8, and will not work in versions after it.  The directive `SSLCertificateFile` was extended to be able to parse files that contain both the domain certificate and the intermediate certificates that make up the chain of trust.

## Step 6 - SSL Configuration in the VHost

Put these lines inside your secure vhost:

```
SSLEngine on                    # enables SSL
SSLProtocol all -SSLv2 -SSLv3   # disables SSL 2 (vulnerable to DROWN) & 3 (vulnerable to POODLE)
SSLHonorCipherOrder on          # requires ciphers from your suite to be attemped in order
SSLCompression off              # disables TLS compression (vulnerable to CRIME)

SSLCipherSuite ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS
```

My source for the cipher suite string is [Mozilla's SSL Config Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/?server=apache-2.4.6&openssl=1.0.1e-fips&hsts=yes&profile=intermediate), using my versions of Apache and OpenSSL and the "Intermediate" preset.

With these settings, I have reasonably good coverage.  The config generator cites some oldest compatible clients: Firefox 1, Chrome 1, IE 7, Opera 5, Safari 1, Windows XP IE8, Android 2.3, and Java 7.

It should be noted that unless you have a single certificate covering all subdomains that your IP serves, browsers that do not support SNI will be unable to access subdomains that have their own certificates.  This applies to Android versions older than 4, Internet Explorer 8 and older on XP, and Java 6.  I'm pretty ok with losing those, however.

## Step 7 - Apply Changes and Test Coverage

Run this command to restart Apache and apply the changes you've made to config files:
```
$ apachectl graceful
```
Using this command instead of something like `apachectl restart` or `systemctl restart httpd.service` will allow any in-progress requests to complete before shutting the process and restarting, for minimal interruption of service.

I highly recommend submitting your site to [Qualys SSL Labs Server Test](https://www.ssllabs.com/ssltest/index.html) to check to see if you have misconfigured or missed anything.

I started out with a C grade, but after disabling SSLv3, disabling RC4, referencing my intermediate certificate file (in the right order), disabling SSL compression, and forcing a specific order for my cipher suite - all of which I've included in this post - I got up to an A grade.  There are a few things I could do to push my numbers higher - OCSP stapling is an easyish one, and I'm sure there are others - but I can't get an A+ grade in any case until my certificate are at least 6 months old, so I'm good for now.

There is a lot to play with here if you have time.

## Step 8 - Set Up Automatic Renewal

Let's Encrypt certificates expire after 90 days.  This limit was designed to be short, in order to encourage people to set up automatic renewal from the very start.  This command was included to make automatic renewal as easy as possible:
```bash
$ sudo certbot renew
```

This runs through all certificates you have installed and checks their expiration dates.  If a cert will expire in less than 30 days, the command automatically renews it.

By default, it performes the renewal the same way that the certificate was created (i.e., `apache` if you made it with the apache plugin, `webroot` if you made it with the webroot method, `standalone` if you made it the super basic way, etc).

Open root's crontab for editing:
```
$ sudo crontab -e
```
And put in the following line:
```
7 3,15 * * * /usr/bin/certbot renew --quiet >> /var/log/le-renew.log
```
Save and exit.  This command runs `/usr/bin/certbot renew --quiet` at minute 7 past 3am and 3pm, every day.  Any output (which should just be errors, because of the `--quiet` flag) is logged to the file `/var/log/le-renew.log`.

This is according to `certbot`'s [documentation](https://certbot.eff.org/#centosrhel7-other), which recommends running `certbot renew` twice a day at an arbitrary minute in the hour.

### Changing the Default Certificate Renewal Method

You can skip this section if you want; if you followed the instructions in the rest of this guide nothing here should be an issue for you.  But, if you made a certificate one way and want to renew it another way, keep reading.

I ran into an issue because I created my first certificate using `standalone`, which requires ports 80 and 443 to be available in order to renew.  This means that Apache can't be running while the renewal is happening, meaning that just running `certbot renew` by itself would fail on this cert (because Apache should always be running).

One fix for this is to write a script that stops Apache, runs `certbot renew` and then restarts Apache afterwards, but that's unnecessary downtime.

Another fix is to renew the certificate with the `webroot` method by simply using the same `certbot certonly --webroot` command I gave in Step 3.  If you run it on an existing certificate, it will give the choice of renewing the cert or reissuing it.  The problem is that doing this only renews _this particular_ certificate and you lose all the benefit of the `certbot renew` command.

Turns out that the default renewal behavior is defined in `/etc/letsencrypt/renewal/peterhenry.net.conf`, which is created at the same time as the certificate.  So, I created a new `webroot` certificate for a different subdomain and then copied (with modifications) what looked like the important bits of its renewal config to the renewal config of my `standalone` cert, like this: 

```
# renew_before_expiry = 30 days
version = 0.8.1
cert = /etc/letsencrypt/live/peterhenry.net/cert.pem
privkey = /etc/letsencrypt/live/peterhenry.net/privkey.pem
chain = /etc/letsencrypt/live/peterhenry.net/chain.pem
fullchain = /etc/letsencrypt/live/peterhenry.net/fullchain.pem

## Following block is the old standalone config, commented out
## for future reference if necessary:

## Options used in the renewal process
#[renewalparams]
#authenticator = standalone
#installer = None
#account = 9c836162b586a440e14996d6ec2fb753

## Following block is the new webroot config, copied from
## another certificate's default config with modifications

# Options used in the renewal process
[renewalparams]
authenticator = webroot
installer = None
account = 9c836162b586a440e14996d6ec2fb753
webroot_path = /var/www/html/portfolio-jekyll/_site,
[[webroot_map]]
peterhenry.net = /var/www/html/portfolio-jekyll/_site
www.peterhenry.net = /var/www/html/portfolio-jekyll/_site
```

And it worked!  Running `certbot renew --dry-run` renewed both certificates with the `webroot` method as desired.

The syntax used in these config files doesn't appear to be well-documented, however, so do this at your own risk.  It sounds like the Let's Encrypt team is working on standardizing documentation and behavior here, so hopefully in the future it'll be easier to set up these sort of defaults or figure out what's going on.

## In Conclusion

At this point you should have an SSL-enabled website, with Let's Encrypt certificates that are set up for automatic renewal and an A grade from Qalys SSL Labs.   The next thing to do is probably figure out how to enable SPDY and speed up content delivery a little bit, or keep tweaking the SSL settings to push up the category grades on SSL Labs.


{% comment %}
failed tutorial: https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-centos-7

my error with the automatic setup (likely an ISP block): https://community.letsencrypt.org/t/failed-to-connect-to-x-x-x-x-443-for-tls-sni-01-challenge/17346/12

linode tutorial: https://www.linode.com/docs/security/ssl/install-lets-encrypt-to-create-ssl-certificates

switching from standalone to webroot: https://community.letsencrypt.org/t/renew-a-cert-with-webroot-plugin-which-was-generated-with-standalone-plugin/12357/4

permissions issues for getting apache to read the certificats: https://community.letsencrypt.org/t/apache-sslcertificatefile-error-does-not-exist-or-is-empty/14995/8
and the permissions calculator http://permissions-calculator.org/decode/0700/

SOLVED different vhost options based on different apache versions https://www.virtualmin.com/node/41061 and also some intermediate cert info
more info on version behavior here https://community.letsencrypt.org/t/apache-directives/5879/7
and my exact solution here: https://community.letsencrypt.org/t/solved-why-isnt-my-certificate-trusted/2479/9

and more info on chaining http://serverfault.com/questions/765153/how-can-i-use-lets-encrypt-letsencrypt-org-as-a-free-ssl-certificate-provider

OOO This might work https://community.letsencrypt.org/t/solved-why-isnt-my-certificate-trusted/2479/3

SOLVED the SSLv3 issue: have to do it in the vhost, not just the master config http://unix.stackexchange.com/questions/162478/how-to-disable-sslv3-in-apache

my current cipher string: http://superuser.com/questions/1026222/apache-poodle-attack-complain-rc4-cipher-complain-even-after-changing-ssl-co

got stapling working with this: https://mozilla.github.io/server-side-tls/ssl-config-generator/


mention /etc/letsencrypt/renewal fix for renewing


<VirtualHost *:443>

        ServerName peterhenry.net
        ServerAlias peterhenry.net www.peterhenry.net

        DocumentRoot "/var/www/html/portfolio-jekyll/_site"

        SSLEngine on
        SSLCertificateFile      /etc/letsencrypt/live/peterhenry.net/fullchain.pem
        #SSLCertificateFile      /etc/letsencrypt/live/peterhenry.net/cert.pem
        SSLCertificateKeyFile   /etc/letsencrypt/live/peterhenry.net/privkey.pem
        #SSLCertificateChainFile /etc/letsencrypt/live/peterhenry.net/chain.pem

        ErrorLog "/var/www/html/portfolio-jekyll/error_log"
        CustomLog "/var/www/html/portfolio-jekyll/access_log" combined

        <Directory /var/www/html/portfolio-jekyll/_site>
                AllowOverride All
                Allow from all
                Require all granted
        </Directory>

</VirtualHost>
{% endcomment %}