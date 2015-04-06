# Explora

## Minimum Viable Product
Explora is a clone of Quora built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create questions
- [ ] Create question answers
- [ ] View questions and their answers
- [ ] View other users questions
- [ ] Subscribe to users
- [ ] View a feed of subscribed users' questions
- [ ] Search for Questions
- [ ] Vote on questions and answers


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Question Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to ask questions using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Creating and Viewing Questions (~1 days)
I will switch to API routes to serve question data as JSON, and add a Backbone
model and collection to fetch data from those routes. By the end of this
phase, users will be able to create and view questions from a single page
Backbone app.

[Details][phase-two]

### Phase 3: Creating and Viewing Answers (~1-2 days)
I will update my API routes to include answers. These answers will be viewable
as part of a composite view for each question. By the end of this phase, users
will be able to create answers to specific questions and view answers to
associated questions.

[Details][phase-three]

### Phase 4: User Feeds (~2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`followed_users` association to serve a list of questions ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `questions`
collection fetches from the new route. Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Phase 5: Searching for Questions (~2 days)
I'll need to add `search` routes to the Questions controller. On the
Backbone side, there will be a `SearchResults` composite view has a
`QuestionsIndex` subview. This view will be comprised of a normal `questions`
collection, fetched from the `search` routes.

[Details][phase-five]

### Phase 6: Ranking Questions and Answers (~1-2 days)
I'll add an upvote/downvote capability. Users will be able to vote on both
questions and answers. This will eventually be the ranking system used to order
both questions on the user's feed and answers to questions.
Will use polymorphic associations to keep the code DRY.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Pagination/infinite scroll
- [ ] Comments on Answers
- [ ] Tags for questions
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
