---
layout: post
title: skillfarming
disqus_identifier: 7f082488-dd32-457c-831e-acf4ce0f84ad
excerpt: >
    Subscribed Eve Online characters continuously and passively accumulate SP (skill points).  The owner of a character is able to extract SP from the character and sell it on the ingame marketplace for ISK (the ingame currency).
---

Hosted at: [https://mosbasik.github.io/skillfarming/](https://mosbasik.github.io/skillfarming/)

Source Code: [https://github.com/mosbasik/skillfarming](https://github.com/mosbasik/skillfarming)

- - -


## Purpose

[Eve Online](https://www.eveonline.com/) players can keep their character(s) subscribed by either paying a monthly fee in real currency to [CCP Games](https://www.ccpgames.com/), or by buying a PLEX (30-day time card) from another player on the ingame marketplace for ISK (the ingame currency) and then activating it.

Subscribed Eve Online characters continuously and passively accumulate SP (skill points).  The owner of a character is able to extract SP from the character and sell it on the ingame marketplace for ISK (the ingame currency).

This application determines which is greater:

1. the ISK cost to keep a character subscribed with PLEX, or
1. the ISK revenue from extracting and selling all the SP it trains.

If the second is greater than the first, it is not only free, but _profitable_ to own "skillfarm" characters that do absolutely nothing but accumulate and sell SP.

- - -

## Background Information

Eve Online's SP mechanic is unusual.

Most MMOs start you off with very low XP and money, and you gain both as you do things in the game like quests or combat.  This provides a direct motivation cycle that keeps you playing, but also means that players with more time to play are going to advance faster.  An adult with a job may be unable to compete ingame against a highschool kid with more time to grind.

Eve removed the XP grind.  SP performs the familiar task of unlocking new abilities and equipment, and accumulates over time at essentially the same rate for all players.

(This resulted in some _very_ interesting effects that I have a lot to say about, but aren't really relevent to this project.)

What is most important to us is that the value of an Eve character is roughly proportional to the amount of SP it has.  This is because by keeping a character subscribed, a player is buying SP from CCP over time.

From 2003 through 2015, the only way this value could be expressed was when a character was bought or sold on the [Official Character Bazaar](https://forums.eveonline.com/default.aspx?g=topics&f=277) - because there was no way to gain SP other than by training it yourself, or buying a character someone else had trained.  And training characters for sale was _very profitable_ - people were willing to pay significantly more ISK for a pre-trained character than the ISK cost of subscribing that character for the length of time needed to train it.

<figure class="right">
    <a href="/img/massivelyop_isk_velocity.png">
        <img alt="ISK Velocity post Skill Trading" title="ISK Velocity post-Skill Trading" src="/img/massivelyop_isk_velocity.png" width="50%">
    </a>
    <figcaption>
        <p>Graph of ISK velocity showing impact of Skill Trading patch. Courtesy of <a target="_blank" href="http://massivelyop.com/2016/03/06/eve-evolved-analysing-eves-new-economic-reports/">Massively OP</a></p>
    </figcaption>
</figure>

In 2016, CCP introduced [Skill Trading](https://community.eveonline.com/news/dev-blogs/exploring-the-character-bazaar-skill-trading/), whereby SP could be _extracted from_ and _injected to_ characters - but not _created_.  Someone still had to train it.

This had a bombshell effect on the economy.  Suddenly, SP in skills that your character never used and did not need (possibly trained by a previous owner, or by you when you had less experience with the game) could be liquidated and their stored value accessed by their owner.  Suddenly, there was no need to save up billions of ISK before buying a character from the bazaar - players could now scrape together a few hundred million ISK and buy a chunk of SP to allow them to do whatever activity they wanted to do - _right now_.

Many activities in Eve only require a very focused set of skills to be effective, and scale well with the number of characters used - activities like mining, or trading, or planetary resource extraction.  These alts need to be kept subbed to be used, but before skill trading, the skills they were training after their main objectives were possible had no immediate use.

It's quite common for people to own multiple specialized alts like this.  Skill trading meant that now, the SP trained by these alts could be extracted and sold to discount the subscription cost of these already-profitable alts.

The crazy thing is that not only does selling the SP discount the subscription cost - it more than fills it.  So far, it's been profitable to own alts that do _absolutely nothing_ but train and sell skills.

Whether or not this profitability will remain stable is up in the air.

## Implementation / Features

Everything this app does can be done with Google Spreadsheets, so my goal in writing this was to make it easier to set up and easier to understand the results.

### Local Storage

This is a simple, single page app with no backend - but all the data that a user enters to describe their personal setup is persistant within the browser.  The data remains across page reloads because it's saved in [HTML5 Web Storage](http://www.html5rocks.com/en/features/storage) associated with that domain in the browser.

A feature I'd like to implement is to pickle the essential data to recreate a setup and export it as a URL with parameters.  This would allow people to bookmark or share different setups easily.

### Character Models

My target audience is people who either have skillfarm characters already or are considering acquiring them.  To this end, it should be simple to plug in an existing set of characters and see their profitability.

The profitability of a given character depends on its attributes remap and its implants, but both of those variables simply affect the rate at which SP is trained.  The "SP/Hour" value for a given combination of attributes and implants is easy to calculate with [EveMon](https://evemondevteam.github.io/evemon/) (a program that anyone who is interested in this sort of thing will already have installed) so at the moment that's one of the basic inputs I'm requesting.  To make things even more basic, a further feature might be to calculate SP/Hour directly from attributes and implants myself.

A character completely optimized for skill farming will have a maximum remap in two attributes and +5 implants for those same attributes.  The corresponding character trains at 2700 SP/Hour, so that is the default character model that is loaded when a new user loads my page for the first time.

### Taxes

Whenever you deal with the Eve marketplace you have to take taxes into account.  Tax rates can be reduced by training trade skills, and many people have dedicated trade characters specifically to buy and sell with low overhead.

The math to figure out what your tax costs are for a given transaction is simple enough once you understand the system, but it's tricky to get right the first time and tedious to apply to every calculation.  One of the benefits of my tool is that tax skills are input just like the rest of the user's data, and taken into account when calculating the bottom line.

Unfortunately, in my last revamp of the styling I accidentally removed the ability to set tax skills :) So that will be coming back at some point.  In the meantime, they're set by default to Accounting IV and Broker Relations IV (the most common for a casual trade alt).




- - -

## Building Blocks

### [Vue.js](https://vuejs.org/)

My friend [Daniel Morgan](https://github.com/danielmorgan) told me about Vue when I was considering learning a JS framework.  I had never even heard the name before, but I googled it and started reading its [Getting Started](http://vuejs.org/guide/index.html) guide.  By the time I'd finished the [Two-Way Binding](http://vuejs.org/guide/index.html#Two-way-Binding) section, I was thinking "Wow, this looks really easy and clean!"  By the time I finished the [All Together Now](http://vuejs.org/guide/index.html#All-Together-Now) section I was already playing with it on a local server and was starting a list ideas for how to use it.

Since then, I've read a lot of people's blogs of Vue and listened to several podcasts featuring its creator, [Evan You](http://evanyou.me/), and I'm pretty much sold.  This framework takes the ease of use of [AngularJS](https://angularjs.org/) and the performance/flexibility of [React](https://facebook.github.io/react/) and the result is amazing.

The coolest thing to me about this library is the way it caches dependencies and how that allows you to write almost totally data-driven frontends.  Instead of using jquery to write listeners to show this bit of UI and hide that bit of UI if such and such a value changes, you can simply reference a `computed` value in a `v-if` block.  That value is computed based on your data object.  Your data object can change as much as it needs to and the computed value is never recomputed unless a part of the data object that it depends on is changed.  When that happens, the value is recomputed and everything that has that value as a dependency is also recomputed - even the UI components.

It's magical - especially compared with how AngularJS treats this kind of situation.  Angular doesn't cache dependencies, meaning that the more computed values you use the slower your application is, because each one has to be checked in every iteration of the event loop.

### [Eve-Central](https://www.eve-central.com/)

This site exposes an XML API that allows price checks (both buy and sell) for any item in any station in Eve.  It's the standard go-to API for any sort of trading spreadsheet and is one of the oldest Eve-related third party services.

It's not as natural to consume an XML API with JS as, say, a JSON API - but fortunately there's an extension to Vue.js called [vue-resource](https://github.com/vuejs/vue-resource) to provide wrappers for common resource calls, and it made things fairly simple.

### [Bootstrap](http://getbootstrap.com/)

For this app, my focus was on the function.  I wanted to spend the minimum time possible on styling.  I started without any styling at all, actually, but once I got my basic functionality working I did want people to be able to use it without tearing their eyes out, so I slapped bootstrap (and the bootflat theme) on it.  It makes the tables and inputs look nicer.

I don't really intend to style this much more than it already is, unless I decide to post the project to Reddit or something - and there are some other steps I need to take before doing that anyway.