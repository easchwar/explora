Explora.Views.TagsIndexItemInline = Backbone.View.extend({
  template: JST['tags/index_item_inline'],

  tagName: 'li',
  className: 'index-item',

  events: {
    'click .remove-tag': 'removeTag',
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    return this;
  },

  removeTag: function() {
    this.collection.remove(this.model);
  }
});
