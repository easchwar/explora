Explora.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function() {
    this.addAllItems();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
  },

  addIndexItem: function(question) {
    var view = new Explora.Views.QuestionsIndexItem({model: question});
    this.addSubview('.question-index', view);
  },

  addAllItems: function() {
    this.collection.each(function(question) {
      this.addIndexItem(question);
      // var view = new Explora.Views.QuestionsIndexItem({model: question});
      // this.addSubview('.question-index', view);
    }, this);
  },

  render: function() {
    console.log(this.subviews());
    var content = this.template({questions: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
});
