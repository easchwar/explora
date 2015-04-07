Explora.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this._subviews = [];
  },

  addSubview: function(view) {
    this._subviews.push(view);
  },

  removeSubviews: function() {
    this._subviews.forEach(function(subview) {
      subview.remove();
    });
    this._subviews = [];
  },

  remove: function() {
    this.removeSubviews();
    Backbone.View.prototype.remove.call(this);
  },

  render: function() {
    this.removeSubviews();

    var content = this.template({questions: this.collection});
    this.$el.html(content);

    var $questionIndex = $('.question-index');
    this.collection.each(function(question) {
      var view = new Explora.Views.QuestionsIndexItem({model: question});
      $questionIndex.append(view.render().$el);
      this.addSubview(view);
    }, this);

    return this;
  },
});
