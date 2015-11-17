---
layout: post
title:  wormholesales
categories: projects
excerpt: In my leisure time, I run a small corporation in the MMO Eve Online created by CCP games.  This project is an under-construction tool to facilitate the buying and selling of "wormhole systems" by Eve players.
---


Hosted at: [http://whsales.peterhenry.net/](http://whsales.peterhenry.net/ "Welcome to the new Wormholesales!")

Source code: [https://github.com/mosbasik/wormholesales-django](https://github.com/mosbasik/wormholesales-django "Proof-of-concept clone of existing site wormholesales.com")

Additional Contributor(s): [Ryan Merrill](http://ryanmerrill.me/ "Personal Site")

- - -

Brief
-----

In my leisure time, I run a small corporation in the MMO [Eve Online](https://www.eveonline.com/ "Real life science fiction") created by [CCP Games](http://www.ccpgames.com/ "CCP Games").  This project is an under-construction tool to facilitate the buying and selling of "wormhole systems" by Eve players.

- - -

Overview of Eve's wormhole market
---------------------------------

A fuller understanding of the project and its goals requires some understanding of Eve's game mechanics.  I'll keep the explaination as brief as I can; Eve is a remarkably complex game and it can be difficult to understand things out of context.

### Game World
The basic territorial unit Eve is the solar system.  At the most basic level, there are two kinds of solar systems:

#### Known Systems
<figure class="right">
    <a href="/img/placidmap.png">
        <img alt="Dotlan: Placid Region" title="Dotlan: Placid Region" src="/img/placidmap.png" width="25%">
    </a>
    <figcaption>
        <p>Topology map of a K-space region.  Each node represents one solar system.</p>
    </figcaption>
</figure>

~5100 of the systems in Eve are "known space" (K-space) and are connected to each other with a static system of "stargates."  You can only travel from one solar system to another through a gate, and each gate is permenent and always bridges the same two systems.  The galaxy map is a [simple], [cyclic], [undirected] graph with unchanging topology (see example at right, courtesy of the excellent resource [DotLan][dotlan]).

This design means that any K-space system can easily be found and travelled to by looking it up on one of the several K-space map tools and finding a course to it using shortest-path graph algorithms.

[cyclic]: http://mathworld.wolfram.com/CyclicGraph.html
[dotlan]: http://evemaps.dotlan.net/map/Placid#jumps
[simple]: https://en.wikipedia.org/wiki/Graph_(mathematics)#Simple_graph
[undirected]: https://en.wikipedia.org/wiki/Graph_(mathematics)#Undirected_graph

<figure class="left">
    <a href="/img/anoikismap.png">
        <img alt="Project Atlas: Anoikis" title="Project Atlas: Anoikis" src="/img/anoikismap.png" width="25%">
    </a>
    <figcaption>
        <p>Example of J-space system distribution - note absence of connecting edges.</p>
    </figcaption>
</figure>

#### Wormhole Systems


The other ~2500 systems in Eve are "wormhole space" (J-space, because each one has a name starting with "J").  These systems do not have any permenant gates; to travel from one to another a player needs to jump through a wormhole bridging the two. (Note: confusingly, the term "wormhole" in Eve terminology can mean either "a solar system without any gates" or "a passage that temporarily bridges two solar systems.")  Systems form wormhole connections somewhat randomly and each connection will live for ~24 hours before breaking.

This design means that there is no way for a player to find a specific J-space system aside from simply jumping through as many wormhole connections as he can find - usually over the course of weeks - and hoping to eventually jump into the hole he wants.

### Market Incentives

J-space is generally more challenging and more lucrative to live in than K-space, but not every wormhole is equal.  A given wormhole's combination of attributes will determine its attractiveness to various groups of players, e.g., young/old players, many/few players, armor/shield players, etc.

Because of the nontrivial effort necessary for a group to scan their own hole, an informal market community already exists in forums, chat channels and websites where explorers post the wormholes they have found for potential buyers to see.  The tools currently used are crude and out-of-date, however, and there is a lot of room for improvement and centralization.

- - -

Existing Tools
--------------

### Forum Marketplace

The original trading tools were simply two subforums of the official Eve Online player forums: [EVE Forums > EVE Marketplace > Sell Orders](https://forums.eveonline.com/default.aspx?g=topics&f=278 "EVE Forums > EVE Marketplace > Sell Orders") and [EVE Forums > EVE Marketplace > Want Ads & Trades](https://forums.eveonline.com/default.aspx?g=topics&f=279 "EVE Forums > EVE Marketplace > Want Ads & Trades").  Players posted "want to sell" and "want to buy" threads and waited for clients to respond.  Details could be worked out in the thread, though personal message or using in-game chat.

### In-game Chat

A public chat channel named "Wormhole Sales" was created by players within the Eve client.  It has several hundred players idling in it at any given time.  People post WTS and WTB ads here to demonstrate order "freshness" (wormhole selling is time-sensitive) and in an attempt to make quick transactions.  A number of trusted third-party broker players idle in this channel to facilitate secure asset transfer between parties.

### Wormholesales

Around 2011, a wormhole selling website owned by affiliates of [Hard Knocks](http://evewho.com/alli/Hard+Knocks+Citizens "EveWho: Hard Knocks Citizens") (a well-known Eve wormhole alliance) was published.  This is [http://wormholesales.com/](http://wormholesales.com/ "Wormhole Sales"), and it continues to be the most widely-used method by explorers to post sell orders.  It provides a standard submission form that helps boost the amount of relevant information accompanying an ad, and it orders ads by date posted to keep the freshest ones most visible.

### WiNGSPANTT

A wormhole-exploration-focused corporation founded by YouTuber [WiNGSPANTT](https://www.youtube.com/user/wingspantt "YouTube: WiNGSPANTT") and named [WiNGSPAN Delivery Services](http://evewho.com/corp/WiNGSPAN+Delivery+Services "EveWho: WiNGSPAN Delivery Services") accepts wormhole buy orders.  A buyer specifies the kind of wormhole he wants and pays a flat fee to the corporation.  If one of their pilots finds a matching wormhole, the buyer is notified and given directions to enter.

- - -

My Project
----------

### The Problem

When I needed to buy and sell wormholes, all the above methods were either work intensive, untimely, or didn't provide the flexibility I wanted.  The Wormholesales website was the best option available, but even that has a lot of missing functionality.

In rough order of importance:

- Only allows sell orders, not buy orders
- Does not support new wormholes introduced in recent patches (footer indicates last website update was in 2013)
- Unable to filter by wormhole attributes to pick out orders relevant to you
- Sorting orders works, but sorting on date is the only version that makes sense
- Sellers are unable to "bump" orders to indicate activity, forcing sellers who want day-to-day visibility to post many duplicate entries
- Order filling/removal requires a secret code; if code is mislaid by the seller the order stays open indefinitely - wasting both buyers' and seller's time
- No validation on the input form means at best the provided wormhole/contact info is uncertain and at worst the order could be a scam

### Setting Up

I sent a mail to [JBmidnite](http://evewho.com/pilot/JBmidnite "EveWho: JBmidnite") (credited as wormholesales' admin) proposing a collaborative update/overhaul of the site, specifically mentioning several features I was excited to try and implement.  I received no response.

I started work on a proof-of-concept site, just aiming for parity with wormholesales, to show I was serious.  I finished in about a week and sent JBmidnite another mail, this time including a link to what I had so far - but still received no response.

I decided to go ahead and start working on new features and worry about contacting Hard Knocks, CAPFL, et. al. about collaboration once I had a better product.

At this point in the Coding Campus schedule, we had essentially completed directed instruction and were encouraged to work on independent projects full-time.  In order to make better progress and practice group coding skills (all previous Coding Campus projects had been essentially solo), I invited my classmate [Ryan Merrill](https://github.com/azuretower "GitHub: azuretower") to help me.

### Building Blocks

#### [Django](https://www.djangoproject.com/ "Django: The Web framework for perfectionists with deadlines.")

Obvious choice while attending a Python/Django bootcamp.

#### [SQLite](https://www.sqlite.org/ "SQLite: Small. Fast. Reliable.  Choose any three.")

Prior to this project, I had been using MySQL and PostGreSQL for all my projects; SQLite had not been officially introduced in class.  I had been doing some research and it sounded like SQLite was fully capable of handling the kind of use cases I was expecting, so I decided to play with it and see how I liked it.  So far, I've been very pleased with its capabilities.  Of course, my site hasn't been under very heavy load yet - but I'll cross that bridge when I come to it.

#### [Bootstrap](http://getbootstrap.com/ "Bootstrap: The world's most popular mobile-first and responsive front-end framework.")

Just from looking at the original Wormholesales site I could tell that it had been created with barely-customized Bootstrap.

It's possible that I will actually make contact with the people running Wormholesales and work out an agreement to contribute my work to their organization.  If that happens, I want my site to feel as similar to the original site as possible.  Instead of a complete overhaul, it would feel like an upgrade to their users.

Of course, this means that the site won't be winning any design contests.

If Wormholesales aren't interested in collaboration, I will probably spend some time rebranding this project and release it independently after doing a good bit of advertising on forums and ingame to try and grow some awareness.

#### [Eve Online XML API](https://developers.eveonline.com/resource/xml-api "HTTP read only API to the EVE Universe")

CCP has provided a read-only HTTP XML API to the Eve Online game world with hundreds of endpoints, designed to facilitate the development of third-party tools.

I am using the character lookup endpoints in my order submission form validation to ensure that the character name indicated as point-of-contact is, in fact, an existing Eve character.

In order to avoid unnecessary API lookups (which are fairly slow), my application first checks my local database for the name in question.  The API is only queried if the name has never been used with my site before.

#### [Eve Who](http://evewho.com/ "Eve Who: Eve Online Corporation and Alliance member listings.")

In conjunction with the API character name lookup, I am using the popular player-made website Eve Who to provide a one-click way for my users to look up information about characters they are considering doing business with.

Because I have previously validated characters against the game API, I am reasonably certain that there will always be a corresponding character page in Eve Who.  If this fails, it should be a problem on Eve Who's side, not mine.

#### [Tripwire](https://tripwire.eve-apps.com/ "Tripwire: The greatest wormhole mapper ever.")

CCP releases a [static data export](https://developers.eveonline.com/resource/static-data-export "Eve Online Static Data Export") with each expansion containing most of the static data of Eve Online - ship and module attributes, celestial positions, item ids, etc.  Much of the data needed to make a comprehensive database of wormhole information is included in this dump.

Notably absent is the information about wormholes' "statics" - the one or two connections that every wormhole is guaranteed to have.  This information is vitally important to know when choosing a wormhole to buy, and is not officially available from CCP.

I knew that the popular wormhole mapping service Tripwire must have access to the static data in order to operate, and I have a loose relationship its developer, [Daimian Mercer](http://evewho.com/pilot/Daimian+Mercer "EveWho: Daimian Mercer").  I sent him a mail asking where he got it from.

He responded that his data had been aggregated over time from contributions from several groups of his users (he has history with [Lazerhawks](http://evewho.com/corp/Lazerhawks "EveWho: Lazerhawks") - another well-known wormhole corp - and the public tool Tripwire is the continuation of an internal tool he wrote for Lazerhawk use).  He pointed me to a public endpoint of his with a JSON document containing all the information collected to date and an assurance that the link would be kept up-to-date as errata are found.

This data allows me to remove any burden from my users for correctly entering class, effect, or statics; all they have to do is enter a valid J-code and all that information is automatically retrieved for them.

As for remaining up-to-date, one reason I picked Tripwire instead of one of the other mapping tools (Siggy, EveEye, Vippy, Piggy, etc) is that in my experience, Tripwire has always updated the fastest.

#### [Eve Planets](http://eveplanets.com/ "Eve Planets: Eve Online Planetary Interaction")

A lot of the value of a wormhole is its potential for lucrative planet-based mining and manufacture.  While I could implement a simple overview of a given system's planets given the data available in the static data export, Eve Planets already does this very well.

My J-code validation allows me to include a link with every order to that system's Eve Planet page for simple and unbiased comparison between various systems' planets.  The existing Wormholesales system relies on the seller to describe the planets, which allows them room to spin the truth to their advantage or forget to include it at all and dropping the apparent value of their order.

#### [zKillboard](https://zkillboard.com/ "Killboard for the MMORPG Eve Online")

#### [wh.pasta.gg](http://wh.pasta.gg/ "wh.pasta.gg: Provides capsuleers of Eve Online with a comprehensive resource to quickly identify activity and historical events in wormholes.")