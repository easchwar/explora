Explora.Views.TagsIndexQuestionForm = Backbone.CompositeView.extend({
  template: JST['tags/index_question_form'],

  tagName: 'div',

  initialize: function() {
    this.addAllItems();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'reset', this.empty);
    this.listenTo(this.collection, 'remove', this.removeIndexItem);
    this.listenTo(this.collection, 'add', this.addIndexItem);
  },

  addAllItems: function() {
    this.collection.each(function(model) {
      this.addIndexItem(model);
    }, this);
  },

  empty: function(model, options) {
    _.each(options.previousModels, this.removeIndexItem.bind(this));
  },

  addIndexItem: function(model) {
    var view = new Explora.Views.TagsIndexItemInline({
      model: model,
      collection: this.collection,
    });
    this.addSubview('.tags-index', view);
  },

  removeIndexItem: function(model) {
    this.subviews('.tags-index').forEach(function(subview) {
      if (subview.model === model) {
        this.removeSubview('.tags-index', subview);
      }
    }.bind(this));
  },

  render: function() {
    var content = this.template({tags: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
