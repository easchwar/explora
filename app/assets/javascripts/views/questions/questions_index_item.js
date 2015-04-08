Explora.Views.QuestionsIndexItem = Backbone.View.extend({
  template: JST['questions/index_item'],

  tagName: 'li',
  className: 'list-group-item',

  events: {
    'click .item-delete': 'deleteItem'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);
    return this;
  },

  deleteItem: function(event) {
    this.model.destroy();
  },
});
