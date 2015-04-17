Explora.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  className: 'row',

  events: {
  },

  initialize: function() {
    this.addForm();
    this.addAnswersIndex();
    this.addRelatedQuestions();
    this.addTagsIndex();

    this.listenTo(this.model, 'sync', this.render);
  },

  addForm: function() {
    var view = new Explora.Views.AnswerForm({
      collection: this.model.answers(),
      question: this.model
    });

    this.addSubview('.answer-form', view);
  },

  addAnswersIndex: function() {
    var view = new Explora.Views.AnswersIndex({collection: this.model.answers()});
    this.addSubview('.answers-index', view);
  },

  addRelatedQuestions: function() {
    var view = new Explora.Views.QuestionsIndex({
      collection: this.model.relatedQuestions(),
      simple: true,
    });
    this.addSubview('.related-questions', view);
  },

  addTagsIndex: function() {
    var tags = this.model.tags();

    var view = new Explora.Views.TagsIndexInline({collection: tags});
    this.addSubview('.tags-index', view);
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    this.$('.timeago').timeago();
    this.attachSubviews();
    return this;
  },
});
