---
layout: post
title: machine learning trade finder
disqus_identifier: 93c2c13f-0b12-45ce-95bf-b903780872db
tags: ideas machine-learning eve-online isk scikitlearn python
excerpt: The hard part of trading in Eve Online is deciding what items to trade on.
---

The hard part of trading in Eve Online is deciding what items to trade on.  Instead of trying to codify what "a good trade" is using precise statistics terminology or thresholds, why not use something like Python's `scikitlearn` library to do supervised learning where the only input is a player that says "I would trade this" or "I would not trade this".  This would allow a user to configure their installation to find trades that they [the user] would like, without having to spend a lot of time and energy figuring out how to define what they like in a way that a computer can understand.  Also it would make it easy to drop items that no longer fit trading criteria or pick up new items that become eligible - a behavior that is _very hard_ to implement with the spreadsheets most traders are using now.