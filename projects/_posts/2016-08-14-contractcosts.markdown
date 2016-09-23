---
layout: post
title: contractcosts
disqus_identifier: c6fd1435-bbd1-47e0-9826-afc078282580
tags: eve-online vue-js github github-pages bootstrap bootflat wormholes evepraisal
sourcelink: https://github.com/mosbasik/contractcosts
hostlink: https://mosbasik.github.io/contractcosts
excerpt: >
  On 9 Aug 2016, Eve Online developers CCP Games enabled the use of contracts
  in player-created citadels. Before then, contracts could only be
  created/completed in NPC stations.
---

## Introduction

On [9 Aug 2016](https://community.eveonline.com/news/patch-notes/patch-notes-for-118.7-release), Eve Online developers CCP Games enabled the use of [contracts](http://wiki.eveuniversity.org/Contract) in player-created citadels.  Before then, contracts could only be created/completed in NPC stations.

Contracts are the only way a player can have their items moved from point A to point B by another player with no risk of fraud/theft/etc.  Since NPC stations do not exist in wormhole space, until this patch there was no way to securely move assets into/out of wormhole space besides doing it yourself.

My alliance lives in wormhole space and owns several citadels; needless to say, we were excited about the new possibilities for compensating internal logistics work.

## Contract Behavior

Note: There are several kinds of contracts in Eve, but "courier" contracts are the ones I'll be talking about.

A courier contract is what a player uses when he has assets at point A, wants to get them to point B, and doesn't want to do it himself.  Maybe A and B are far apart and the owner doesn't have time to do it, or maybe his assets are very large and he isn't able to fly the ship that's big enough to carry everything at once.  He wants someone else to do it.

So the owner creates a contract using the items at **pickup** point A and specifying the **destination** point B.

Time is money and Eve is no exception.  No one will spend an hour moving someone else's assets for free.  The owner sets a **reward** on the contract - a sum of ISK to be transferred to the contractor's account when the contract package arrives at the destination.  The owner has total control over the size of the reward.

To keep the contractor from stealing the package instead of delivering it, the owner sets a **collateral** on the contract - a sum of ISK that the contractor must place into escrow before he is allowed to pick up the package.  If the delivery is made before the contract's time limit runs out, the contractor is refunded his collateral.  Otherwise the owner receives the collateral and the contract is cancelled.

## Existing Contract Markets

There are three main kinds of "markets" where courier contracts are published and picked up.

The simplest are the **independent** markets, where owners and haulers deal directly with each other for one-off contracts.  They use chat channels like `Haulers Channel` to organize deals, and contract prices are governed by the market.  If you want to spend as little as possible, you can find the cheapest hauling here (but it will probably take a while for your goods to move).  If you want your goods moved ASAP, you can negotiate speedy delivery directly with your hauler (but it will probably cost you a premium).  However, service to dangerous areas - anywhere out of high security space - is going to be very hard to find.

Next are the **organized** markets, where groups of haulers have set rates and guaranteed behavior.  Examples are [PushX](https://www.pushx.net/) or [Red Frog](http://red-frog.org/jumps.php), who both have webapps that specify their reward rates given the distance, volume and collateral of a contract.  They tend to be more expensive than independent haulers, but they usually guarantee same-day delivery with no need to haggle over price, publicize a contract until it gets picked up, etc.  Basically, they sell convenience.  They also deliver to dangerous areas - but at _significantly_ increased cost.

Last are the **private** markets, the internal logistics organizations of corps and alliances.  I've never been in an alliance besides my own, so I can't comment too much on how other groups handle this - but my understanding is that most operate on the same basic principles as the public organized markets.

## Quirks in Wormhole Contracting

### Changing Distances

Every kspace hauling reward calculator I've used in Eve uses the pickup and destination stations in its formula; the longer the distance between them, the higher the contract reward.

This is completely impossible to do when wormholes are involved, because the impermanent connections mean that the shortest distance between a given wormhole and any other system in the game (wormhole or not) is changing constantly.

This means that contract reward can only be calculated from the volume (bigger = more reward) and the collateral (higher value = more reward).

### Mass Limits

In highsec, most hauling (by volume) is done using freighters, which have the most capacity of any hauling ship.  In dangerous kspace (lowsec and nullsec), most hauling (again by volume) is done using jump freighers (lower capacity but can teleport long distances).

Both of these ship classes are far too large to fit through the connections of Class 1 through Class 4 wormholes.

Efficient low-class wormhole hauling _must_ be done with either a DST (deep space transport) or an Orca.  Usually a DST.  Both of these have far less capacity than freighters/jump freighters.

### Vulnerable System Entrances

In kspace, the gates connecting the solar systems are permanent.  They cannot be destroyed by players; they never change which systems they connect to; they are a Fact of Life.  There will always be [a route from Jita to UVHO-F](http://evemaps.dotlan.net/route/Jita:UVHO-F) (though whether or not you will find fleets of hostiles on half of the gates ready to kill you is another matter).

In wspace, the wormholes that connect solar systems are impermanent.  They _can_ be destroyed by players (by pushing very heavy ships back and forth through them until the wormhole's mass limits are exceeded and they collapse) and wormhole players can do this all day, every day.

It is never guaranteed that there exists _any route at all_ into a given wormhole.  The inhabitants may have rolled all entrances shut and not opened the exit(s).  This is very bad news to a hauler trying to deliver a contract before it expires.

## Project Goal

I wanted to set up an internal hauling system built on citadel courier contracts for my alliance members.  In order to get anyone to use it, it had to be low friction for both owners and haulers to use, and it had to provide prices that both sets of users think are fair.

## Project Implementation

### Free Market vs Fixed Pricing

One design choice that I felt very strongly about was to avoid free market pricing.  While it is the fairer of the two systems, it is the one that requires the most work for both owners and haulers:

- Owners: because optimal rational behavior is to track other owners' behavior and price their own contracts slightly more attractively in order to get completed first, or if there is no competition, to make a judgement call about the cheapest reward that haulers will accept.

- Haulers: because optimal rational behavior is identify the most attractive contracts and prioritize moving them first, and for each contract examined, to make a judgement call about whether or not the offered reward is worth the time needed to complete the contract (given the current wormhole connectivity).

If the Eve Online contract UI had more features for comparing contracts against each other and was more fluid and responsive, these sort of judgement calls wouldn't be a burden - but it doesn't, and they are, and the result is a lot of friction and not a lot of business.

One workaround would be to develop a webapp with those kinds of features that pulls from the contract endpoints of the Eve API - but that is a lot of dev time for something that less than 100 people will probably ever use.  It might be cool for a public contracting system (it might even already exist) but it was overkill for what I wanted.

So, the alternative is to fix prices at a point that a plurality of my members think is fair.  This way, owners spend no time trying to figure out how low they can price their contract and still get it moved, and haulers spend no time trying to figure out which contract is the most money for their time.  I started researching the reward formulas of the big hauling corporations for ideas.

### Pricing Algorithm - First Steps

Let the price (the reward given to the hauler) of a contract be represented by the function _P_.  As I mentioned above, _P_ depends on the volume of the contract _v_ (units are m<sup>3</sup>) and the collateral of the contract _c_ (units are ISK).  So, let's make a stab at defining that function like this:

_P_(_v_,_c_) = _vr<sub>v</sub>_ + _cr<sub>c</sub>_

where the two _r_'s represent  weighting rates we can tweak to change the contribution of one or the other independent variable to the result.

#### Defining _r<sub>v</sub>_

This variable will affect the contribution of contract volume to reward.

The largest common contract in a wormhole will be 62,500 m<sup>3</sup>, since that is the cargo of a max-skilled DST (an orca can hold more, but will be uncommon).  I decided to set _r<sub>v</sub>_ by what seemed like a fair price for a full DST load of "junk" - low value, high volume materials like ore, minerals, or low-tier planetary interaction goods - essentially examining the case where the collateral value of the contract (and so its term in _P_) approaches zero.

I thought 20,000,000 ISK (20m ISK) seemed fair, and calculated backwards from there to find a value for _r<sub>v</sub>_:

20,000,000 ISK = (62,500 m<sup>3</sup>)(_r<sub>v</sub>_)

320 ISK/m<sup>3</sup> = _r<sub>v</sub>_

#### Defining _r<sub>c</sub>_

This variable will affect the contribution of contract collateral to reward.

##### Undercollateralization vs Overcollateralization

Here is an interesting case.  How much collateral a contract has is (ostensibly) entirely up to its owner.  But, let's examine some motivations:

- If the collateral is set _under_ the market value of the contract's contents, an opportunistic hauler will steal the contract, forfeit the collateral, sell the goods and make a profit (owner risk).

- If the collateral is set _over_ the market value of the contract, an opportunistic owner will destroy the hauler en route or keep the wormhole closed until the contract expires, forfeiting the goods but collecting the collateral and making a profit (hauler risk).

This means the optimal collateral should be the exact market value of the goods, but... the owner has full control over the contract, meaning that he is able to protect himself by setting a sufficiently high collateral amount.  The hauler has no control besides refusing to pick up the contract, and picking up contracts is how he makes his money.

As the designer of the system, I can try to build in a little protection for the hauler by penalizing the owner for overcollateralizing.  The current definition of _P_ does this by increasing the reward in proportion with the collateral.

Unfortunately, this is not a real solution to the problem.  The reward is only awarded to the hauler when the contract is completed.  If the owner pulls off an overcollateralization fraud, he will never have to pay the "penalty" of that contract's larger reward because the hauler will never complete it.  Instead, we will have to rely on outside motivators - in this case, that defrauding an alliance member is grounds for an immediate expulsion.

All that being said, market value of the goods is still the best collateral.  Because this is always the case, my app can calculate it _for_ the owner who is setting up a contract, making their life that much easier and reducing the chance that his faulty math will put him or his hauler at risk.  Even if internal fraud is forbidden, overcollateralizing unnecessarily penalizes the hauler if he is attacked by external hostiles - always a danger when hauling through dangerous space.

There are _many_ markets in Eve, though, and many prices in each market.  I decided to simply use the lowest "sell" price in Jita, the largest market in the game.  My justification for this is that the main purpose of collateral is to reimburse the owner if the contract is lost.  If he gets the Jita Sell price, he will (roughly speaking) be able to immediately re-buy all his goods without any delay.  In comparison, Jita Buy is an undercollateralization case, Dodixie Sell is an overcollateralization case, etc.

##### Contribution of Correct Collateral

The collateral of a reasonably common DST load of stuff is about 1,000,000,000 ISK (1b ISK).  This is about the value of a full load of higher-tier planetary interaction material, or a few advanced cruiser hulls and their fittings.  I decided to define _r<sub>c</sub>_ as 1/100, so 1% of the collateral is contributed to the reward.

For a billion ISK collateral, this contributes 10,000,000 ISK (10m ISK) to the reward - roughly half the contribution of the volume.  I decided to weight collateral more weakly because many of my alliance members are newer players who aren't transporting much expensive stuff.  This way, the haulers will still get paid a reasonable amount for transporting mostly cheap stuff.

### Pricing Tweaks

So, with values established for _r<sub>v</sub>_ and _r<sub>c</sub>_, the price function looks like this:

_P_(_v_,_c_) = (_v_ * 320 ISK/m<sup>3</sup>) + (_c_ * .01)

When I ran this by my alliance members, though, they suggested that a flat fee be included.  They wanted each contract to start with a base fee to which all of the scaling fees would be added - say, 3,000,000 ISK (3m ISK) or so.

This is a common feature of the big hauling corporations' prices, and I wasn't sure at first if my members just wanted this because they'd seen it elsewhere or because there was a good reason behind it.

The basic effect of this, it seems to me, is to encourage owners to bundle contracts together.  Instead of making small contracts whenever they think of something that needs to be hauled, it's in their best interests to store up assets until they really need one of the things or until the contract is large enough to fill an entire DST.  At that point, they bundle all the things into one contract and ship them.  The scaling fees will be the same as in independent contracts, but only one of the flat fees will be paid, saving them money.

I wasn't a big fan of this.  It seems to me like it introduces friction.  Instead of making contracts _when_ you think of a thing you need and being assured that you aren't losing money, you are required to keep a mental list of things you need until you decide to finally ship.  And when you ship, you better remember everything.  Personally, I'm terrible at keeping track of things like this.  The lack of folders or tagging or any real organizational structure for items in Eve Online doesn't help.

On the other hand, it does introduce gameplay tradeoffs; you can either save money at the cost of some mental effort, or you can pay a little bit more and not have to think at all.  Eve is full of these kinds of decisions.  And it does allow haulers to make a little more money at the expense of lazy people.  Not to mention, it means that the tiny little contracts like "two skillbooks and three sets of sisters probes" do actually make people a nontrivial amount of money to complete using a frigate or whatever. Without a flat fee, those rewards would be the hundreds of thousands of ISK - miniscule.

So the final price function is this:

_P_(_v_,_c_) = (_v_ * 320 ISK/m<sup>3</sup>) + (_c_ * .01) + 3,000,000 ISK

## Handy Features

Of course, I could just have just sent an alliance mail with that function and said "ok guys, this how you need to price your contracts to the wormhole from now on" - but that would have been mean.  Or I could have set up a page with two inputs - volume and collateral - and have it spit out the answer on submission.  But that would have been boring, and just like all the other shipping corporations.

### Evepraisal Links

[Evepraisal](http://evepraisal.com/) is the de-facto standard tool that Eve players use to get a market value for a stack of random items, _and_ it has a sweet hidden JSON API (unfortunately it is not CORS-enabled - _rage_ - but that can be gotten around with a CORS proxy like [crossorigin.me](http://crossorigin.me/)).

#### Prices

Everyone is already using it to calculate the proper collateral for their contracts anyway, so it's not a huge step for them to simply submit their Evepraisal link instead of their price.  This lets me do a couple of nice things:

- I can require the Evepraisal to be taken for a specific station (Jita, in my case) and reject it if it's from anywhere else.  This forces people to have the correct collateral.

- I can pull exactly the number I want from the Evepraisal automatically, instead of relying on the user to figure out that I want the the third-from-the-bottom number from the second column.  I've noticed that people always tend to round their evaluations when you ask them to type numbers by hand. :)

#### Volumes

Not only can Evepraisal give me collateral, but also volume.  There is one (fairly large) caveat, though: all volumes are _unpackaged_ volumes.  For most items this is fine, but in the case of ship hulls the packaged volumes are _drastically smaller_ than the unpackaged volumes, and this makes a huge difference when hauling via DST (you can fit 5 packaged cruisers in a DST, but zero unpackaged ones).

The packaged volume of a ship depends solely on its hull class - all frigates are the same packaged size, all destroyers are the same packaged size, etc - so I built in a feature that detected all ships in a submitted Evepraisal, loaded them as packaged by default, and provided a switch next to each hull to use the unpackaged volume in reward calculations if desired.

### Volume Checks

Some things are just too big to fit into a low-class wormhole. My tool is able to show the DST skill level needed in order to fit various sizes of contract, and will display a warning when the contract becomes too large to fit in a max-skills DST.

I'd really like this feature to be more granular - for it to be able to suggest things like "this will probably fit in a frigate", "this will probably fit in a tech 1 industrial", "this will fit in a well-kitted orca", "this will fit in a max-cargo full-retard orca" etc.  The trouble is that cargo space is often dependent not only on a number of skills but also on how a ship is fit. This feature might take some doing to polish.

### Buy Contract Price

I haven't gone into buy contracts, but they are essentially a list of things that you want to buy and a price you are willing to pay for them.  A buy contract has to be filled as a unit - it's all or nothing.

Most of the functionality of my tool asssumes that the owner already owns the the goods and is just trying to move them from one place to another, but this isn't always the case.  What if they just want certain items in the citadel and they don't care who buys them?  It's not so different for the hauler to buy the items himself and come fill the buy contract than it is for the hauler to pick up the items and move them (aside from the lockout assurance that courier contracts give - only one person can hold a courier contract at a time, but many people could be racing to fill a buy contract - when it gets filled, all but one person is left holding unwanted goods).

My tool shows the fair price for a buy contract equivalent to a courier contract for the same goods - i.e., the collateral and reward values added together.

Note that there is a profit opportunity here for the hauler - because the collateral is the sell price, the hauler can make a little off the margins by buying the materials with buy orders instead, at the risk of taking a little longer.
