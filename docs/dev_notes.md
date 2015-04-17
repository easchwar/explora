## Known Issues:
- ~~Adding an answer to a previously unanswered question requires two redirects to
  show it as topAnswer() for the index.~~
- sidebar changes size when navigating to and from the question show view.
  - has to do with the presence of the scrollbar. The fact that the sidebar is
    fixed makes it seem to grow
  - the whole thing is a mess; doesn't resize well at all
- ~~No longer using getOrFetch for questionShow because of the issue of possibly
  adding a model to the feed collection that shouldn't be there. This prevents
  the website from caching the question though which forces it to fetch from the
  databasse every time it instantiates the view.~~
    - ~~possible fix:~~__FIXED__: make a generic allQuestions collection at router initalize
      that is empty and only used for caching purposes. You then getOrFetch from there.
- clicking the edge of a tag doesn't fire the link because the 'li' is slightly bigger
  than the anchor tag.
- user_sidebar doesn't have a working tag search

## Todo:
- ~~Add route for tagged item feed (already have controller action)~~
- ~~modal for question form~~
- ~~tags collection for form select box~~
- ~~sign up page~~
- ~~conditional delete buttons for questions and answers index items~~
  - add for show view too
- ~~upgrade answerShow~~
  - ~~display author~~
  - ~~delete button for answers you have written~~
- ~~make useful navbar~~
  - ~~this depends on whether I want to make a user profile page.~~
  - ~~implement search~~
- Tags
  - in tag header view, determine whether the current user is subscribed to the
    displayed tag (to determine sub/unsub action by clicking glyphicon)
  - ~~make it possible to assign any number of tags to a question~~
    - ~~don't use the select form item~~
  - ~~fix typeahead on question form~~
  - ~~allow deletion of tags in question form~~
  - ~~upon subscription to tag, add it alphabetically to the sidebar (require a
    change to addSubview())~~
- apply search to users
- Better seed data
- rich text editor

## Interesting Problems:
### Making a feed action for questions controller
Users have a polymorphic subscription association: they can subscribe to both
tags and other users. The feed needs to generate all questions that are either
tagged with a subscribed tag, or asked by a subbed user. Since the tag to tagged
question relation is different from the user to authored_question relation, I
needed a custom query that couldn't be solved by a single activerecord association.

Solved by querying the database twice, once for subbed_tag_questions, and once
for subbed_user_questions. Then I switched them to arrays, smashed them together,
`.uniq`ed the combined array, and served it as json to backbone. It's a little
slower than I would've liked, but it works fine.  
