Explora.Views.AnswersIndex = Backbone.CompositeView.extend({
  template: JST['answers/index'],

  initialize: function(options) {
    this.question = options.question;
    this.addAllItems();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
    this.listenTo(this.collection, 'remove', this.removeIndexItem);
  },

  addAllItems: function() {
    this.collection.each(function(model) {
      this.addIndexItem(model);
    }, this);
  },

  addIndexItem: function(model) {
    var view = new Explora.Views.AnswersIndexItem({
      model: model,
      question: this.question,
    });
    this.addSubview('.answers-index', view, {prepend: true});
    view.$('.timeago').timeago();
  },

  removeIndexItem: function(model) {
    this.subviews('.answers-index').forEach(function(subview) {
      if (subview.model === model) {
        this.removeSubview('.answers-index', subview);
      }
    }.bind(this));
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.$('.timeago').timeago();
    return this;
  },
});
