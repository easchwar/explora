Explora.Views.TagsIndexItem = Backbone.View.extend({
  template: JST['tags/index_item'],

  tagName: 'li',
  className: 'index-item',

  events: {
    'click .item-delete': 'unsubscribe',
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    return this;
  },

  unsubscribe: function(event) {

  },
});
