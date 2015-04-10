Explora.Views.DefaultSidebar = Backbone.View.extend({
  template: JST['sidebars/default'],

  initialize: function(options) {
    this.tags = options.tags;

    this.listenTo(this.tags, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tags: this.tags});
    this.$el.html(content);
    return this;
  },
});
