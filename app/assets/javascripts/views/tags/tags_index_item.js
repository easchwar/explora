Explora.Views.TagIndexItem = Backbone.View.extend({
  template: JST['tags/index_item'],

  render: function() {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    return this;
  },
});
