Explora.Views.TagHeader = Backbone.View.extend({
  template: JST['tags/header'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    return this;
  },
});
