Explora.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/index'],

  tagName: 'ul',
  className: 'list-group',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
    return this;
  },
});
