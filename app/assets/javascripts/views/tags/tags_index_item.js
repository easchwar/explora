Explora.Views.TagsIndexItem = Backbone.View.extend({
  template: JST['tags/index_item'],

  tagName: 'li',
  className: 'index-item',

  events: {
    'click .item-delete': 'removeSubscription',
  },

  initialize: function(options) {
    this.deleteable = options.deleteable;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      tag: this.model,
      deleteable: this.deleteable,
    });
    this.$el.html(content);
    return this;
  },

  removeSubscription: function() {
    this.model.subscription().destroy();
    this.collection.remove(this.model);
  }
});
