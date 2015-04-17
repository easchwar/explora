Explora.Views.UserSidebar = Backbone.CompositeView.extend({
  template: JST['sidebars/user'],
  events: {
    'click .add-search': 'toggleHidden',
    'submit form': 'toggleHidden'
  },

  initialize: function(options) {
    this.tags = options.tags;
    this.addTagsIndex();
    this.addTagSearch();
    this.listenTo(this.model, 'sync', this.render);
  },

  addTagsIndex: function() {
    var view = new Explora.Views.TagsIndex({collection: this.tags});
    this.addSubview('.tags-index', view);
  },

  addTagSearch: function() {
    var view = new Explora.Views.TagSearchForm({collection: this.tags});
    this.addSubview('.tag-search', view);
  },

  toggleHidden: function() {
    this.$('.add-search').toggleClass('hidden');
    this.$('.tag-search').toggleClass('hidden');
    this.$('.tag-search').find('input').focus();
  },

  render: function() {
    var content = this.template({
      user: this.model,
      tags: this.tags,
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
