Explora.Views.DefaultSidebar = Backbone.CompositeView.extend({
  template: JST['sidebars/default'],

  initialize: function(options) {
    this.tags = options.tags;
    this.addTagsIndex();
    // this.listenTo(this.tags, 'sync', this.render);
  },

  addTagsIndex: function() {
    var view = new Explora.Views.TagsIndex({collection: this.tags});
    this.addSubview('.tags-index', view);
  },

  render: function() {
    var content = this.template({tags: this.tags});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
