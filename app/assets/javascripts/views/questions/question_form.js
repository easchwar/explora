Explora.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form_modal'],

  tagName: 'div',

  events: {
    'click .modal-show': 'setupInputFocus',
    'click .form-submit': 'submit'
  },

  initialize: function(options) {
    this.tags = options.tags;
    this.listenTo(this.tags, 'sync', this.render);
  },

  render: function() {
    var content = this.template({tags: this.tags});
    this.$el.html(content);
    return this;
  },

  setupInputFocus: function(event) {
    $('#questionFormModal').one('shown.bs.modal', function () {
      $('.body-input').focus();
    });
  },

  submit: function(event) {
    event.preventDefault();
    var question = new Explora.Models.Question(this.$('.question-form').serializeJSON());
    question.save({}, {
      success: function(model) {
        this.$('textarea').val('');
        this.$('#questionFormModal').modal('hide');

        $('#questionFormModal').one('hidden.bs.modal', function() {
          this.collection.add(model);
          Backbone.history.navigate('/questions/' + model.id, {trigger: true});
        }.bind(this));
      }.bind(this)
    });
  },
});
