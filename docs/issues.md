Known Issues:

- Adding an answer to a previously unanswered question requires two redirects to
  show it as topAnswer() for the index.
- sidebar changes size when navigating to and from the question show view.
- No longer using getOrFetch for questionShow because of the issue of possibly
  adding a model to the feed collection that shouldn't be there. This prevents
  the website from caching the question though which forces it to fetch from the
  databasse every time it instantiates the view.
    - possible fix: make a generic allQuestions collection at router initalize
      that is empty and only used for caching purposes. You then getOrFetch from there.

Todo:
- Add route for tagged item feed (already have controller action)
- Better seed data
- modal for question form
- make useful navbar
