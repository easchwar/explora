# Phase 3: Creating and Viewing Answers

## Rails
### Models

### Controllers
Api::AnswersController (create, destroy, index, show, update)

### Views
* questions/show.json.jbuilder

## Backbone
### Models
* Question (parses nested `answers` association)
* Answer

### Collections
* Answers

### Views
* QuestionShow (composite view, contains AnswersIndex, AnsweForm subview)
* AnswersIndex (composite view, contains AnswersIndexItem subviews)
* AnswersIndexItem
* AnswerShow
* AnswerForm

## Gems/Libraries
