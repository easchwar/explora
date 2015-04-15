Explora.Views.TagSearchForm = Backbone.View.extend({
  template: JST['tags/search_form'],

  tagName: "form",

  events: {
    'submit': 'search',
  },

  addTypeahead: function() {
    this.$('.typeahead').typeahead({
      minLength: 1,
      highlight: true,
    },
    {
      name: 'my-dataset',
      source: this.typeaheadSource
    });
    this.$('.tt-input').css('background-color', 'white');
  },

  typeaheadSource: function(query, process) {
    $.ajax({
      url: '/api/tags',
      dataType: 'json',
      data: {search: query},
      success: function(data) {
        var names = _.map(data, function(object) {
          return {value: object.tag_name};
        });
        return process(names);
      }
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.addTypeahead();
    return this;
  },

  search: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    $.ajax({
      url: '/api/tags/find',
      type: 'GET',
      dataType: 'json',
      data: formData,
      success: function(tag) {
        this.$('input').val('');
        this.$('.typeahead').typeahead('close');

        var subData = {
          user_id: ""+ CURRENT_USER.id,
          subscribable_id: "" + tag.id,
          subscribable_type: 'Tag',
        };

        this.subscribe(subData, tag);
      }.bind(this),
    });
  },

  subscribe: function (subData, tag) {
    var subscription = new Explora.Models.Subscription(subData);

    subscription.save({}, {
      success: function() {
        this.collection.add(tag);
        Backbone.history.navigate('/tags/' + tag.id + '/questions', {trigger: true});
      }.bind(this)
    });
  },
});
