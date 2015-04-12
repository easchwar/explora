Explora.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  className: 'row',

  initialize: function() {
    this.addForm();
    this.addAnswersIndex();

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

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
