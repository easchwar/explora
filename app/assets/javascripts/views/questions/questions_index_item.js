Explora.Views.QuestionsIndexItem = Backbone.CompositeView.extend({
  template: JST['questions/index_item'],

  tagName: 'li',
  className: 'list-group-item',

  events: {
    'click .item-delete': 'deleteItem'
  },

  initialize: function() {
    if (this.model.topAnswer().get('created_at')) {
      this.addAnswerIndexItem();
    }

    this.listenTo(this.model, 'sync', this.render);
  },

  addAnswerIndexItem: function() {
    var view = new Explora.Views.AnswersIndexItem({
      model: this.model.topAnswer(),
      tagName: 'p',
      className: 'question-item-top-answer',
    });
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
