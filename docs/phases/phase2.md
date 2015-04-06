# Phase 2: Viewing Blogs and Posts

## Rails
### Models

### Controllers
Api::QuestionsController (create, destroy, index, show)
Api::AnswersController (create, destroy, show, update)

### Views
* questions/show.json.jbuilder

## Backbone
### Models
* Question (parses nested `answers` association)
* Answer

### Collections
* Questions
* Answers

### Views
* QuestionsIndex
* QuestionForm
* QuestionShow (composite view, contains AnswersIndex subview)
* AnswersIndex (composite view, contains AnswersIndexItem subviews)
* AnswersIndexItem
* AnswerShow

## Gems/Libraries
