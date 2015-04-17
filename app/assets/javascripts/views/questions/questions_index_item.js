Explora.Views.QuestionsIndexItem = Backbone.CompositeView.extend({
  template: JST['questions/index_item'],

  tagName: 'li',
  className: 'index-item list-group-item',

  events: {
    'click .item-delete': 'deleteItem',
    'click .item-answer': 'addForm',
  },

  initialize: function(options) {
    if (this.model.topAnswer().get('created_at')) {
      this.addAnswerIndexItem();
    }
    this.listenTo(this.model, 'sync', this.render);
  },

  addForm: function() {
    var view = new Explora.Views.AnswerForm({
      collection: this.model.answers(),
      question: this.model,
    });

    this.addSubview('.answer-form', view);
    this.$('textarea').focus();
    this.$('.item-answer').addClass('hidden');
  },

  addAnswerIndexItem: function() {
    var view = new Explora.Views.AnswersIndexItem({
      model: this.model.topAnswer(),
      tagName: 'p',
      className: 'question-item-top-answer',
    });
    this.$('needs-answers').addClass('hidden');
    this.addSubview('.question-index-item-answer', view);
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  deleteItem: function(event) {
    this.model.destroy();
  },
});
