Explora.Views.TagsIndexInline = Backbone.View.extend({
  template: JST['tags/index'],

  tagName: 'ul',
  className: 'list-group list-inline',

  initialize: function() {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
    return this;
  },
});
