
# Ideas

Concepts that come to me in the shower or car or movie theater, that I might or might not ever work on.  If I do work on something from here, I'll try to link it.

- - -

## Tagging instead of "Ideas"

After writing up a few of the ideas that have been bouncing around in my head the past few days, I realized that these kinds of entries are basically short blog entries.  This is the kind of thing I'm supposed to be publishing, that someone might be interested in if they were a subscriber (if I had an RSS feed for this blog set up).  Instead of sticking ideas by themselves in their own corner, I should just implement tagging on this blog, create an `#ideas` tag and make the ideas page show all the entries that have that tag.`

## Published Sleep Graph

I've been logging my sleep patterns since about 2012.  The Android app I use to collect this data is fine as a collection tool but is terrible as an analysis tool. I only ever really look at the past week or two of data.  All the old data is backed up to their servers, accessible with OAuth2, and can be downloaded in `.csv` form.  I should set up some kind of script that pulls my logs down regularly and displays it on this site somehow.  I bet there are a lot of cool JS libraries for displaying data in cool ways.

## Machine Learning Trade Finder

The hard part of trading in Eve Online is deciding what items to trade on.  Instead of trying to codify what "a good trade" is using precise statistics terminology or thresholds, why not use something like Python's `scikitlearn` library to do supervised learning where the only input is a player that says "I would trade this" or "I would not trade this".  This would allow a user to configure their installation to find trades that they [the user] would like, without having to spend a lot of time and energy figuring out how to define what they like in a way that a computer can understand.  Also it would make it easy to drop items that no longer fit trading criteria or pick up new items that become eligible - a behavior that is _very hard_ to implement with the spreadsheets most traders are using now.

## Restaurant Picker

Family gets together and goes out to eat every Sunday.  We have to pick a restaurant somehow.  A number of constraints: some people dislike barbecue, some people dislike mexican food, some people don't care what we eat as long as we don't go to the same place every time.  Talked to another family that put a bunch of slips of paper in a jar with restaurant names on them and drew them at random to pick.  A computer program could probably do this better.
