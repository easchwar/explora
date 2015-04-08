Explora.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function() {
    this.addAllItems();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
    this.listenTo(this.collection, 'remove', this.removeIndexItem);
  },

  addIndexItem: function(model) {
    var view = new Explora.Views.QuestionsIndexItem({model: model});
    this.addSubview('.questions-index', view);
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
