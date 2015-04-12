## Known Issues:
- Adding an answer to a previously unanswered question requires two redirects to
  show it as topAnswer() for the index.
- sidebar changes size when navigating to and from the question show view.
- ~~No longer using getOrFetch for questionShow because of the issue of possibly
  adding a model to the feed collection that shouldn't be there. This prevents
  the website from caching the question though which forces it to fetch from the
  databasse every time it instantiates the view.~~
    - ~~possible fix:~~__FIXED__: make a generic allQuestions collection at router initalize
      that is empty and only used for caching purposes. You then getOrFetch from there.

## Todo:
- Add route for tagged item feed (already have controller action)
- Better seed data
- modal for question form
- make useful navbar
- change url for tags (use tag_name instead of id)

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