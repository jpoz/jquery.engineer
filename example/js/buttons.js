$.objects.define('button', {
  defaults: { href:'#', text:'Click here', color:'green' },
  structure: function(options) {
    return $('<a/>', {
      href: options.href,
      'class': 'awesome ' + options.color,
      html: options.text
    });
  }
});

$.objects.define('new_button_creator', {
  behavior: function(options) {
    this.
    click(function() {
        var text = $('#button_text').attr('value');
        var color = $('#button_color').attr('value');

        var new_button = $.objects.make('button', {color:color, text:text });
        $('body').append(new_button);
    })
  }
});

$(document).ready(function() {
  var new_button = $.objects.make('button', {color:'blue'}).behaveLike('new_button_creator');
  $('body').append(new_button);
});

