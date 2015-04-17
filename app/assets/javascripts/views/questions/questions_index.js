Explora.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function(options) {
    this.options = options || {};
    this.addAllItems();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
    this.listenTo(this.collection, 'remove', this.removeIndexItem);
  },

  addIndexItem: function(model) {
    var view = new Explora.Views.QuestionsIndexItem({model: model});
    if (this.options.simple) {
      view.template = JST['questions/index_item_simple'];
    }
    this.addSubview('.questions-index', view, {prepend: true});
    view.$('.timeago').timeago();
  },

  addAllItems: function() {
    this.collection.each(function(model) {
      this.addIndexItem(model);
    }, this);
  },

  removeIndexItem: function(model) {
    this.subviews('.questions-index').forEach(function(subview) {
      if (subview.model === model) {
        this.removeSubview('.questions-index', subview);
      }
    }.bind(this));
  },

  render: function() {
    var content = this.template({questions: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
