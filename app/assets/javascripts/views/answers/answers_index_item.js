Explora.Views.AnswersIndexItem = Backbone.View.extend({
  template: JST['answers/index_item'],

  tagName: 'li',
  className: 'index-item list-group-item',

  events: {
    'click .item-delete': 'deleteItem'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({answer: this.model});
    this.$el.html(content);
    return this;
  },

  deleteItem: function(event) {
    this.model.destroy();
  },
});
