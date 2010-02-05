$.objects.define('button', {
  defaults: { href:'#', text:'Click here', color:'#53995B', hovercolor:'#7DAE88' },
  structure: function(options) {
    return $('<a/>', {
      css: {
          'background': options.color,
          'display': 'inline-block', 
          'padding': '5px 10px 6px',
          'color': '#fff', 
          'text-decoration': 'none',
          '-moz-border-radius': '5px', 
          '-webkit-border-radius': '5px',
          '-moz-box-shadow': '0 1px 3px rgba(0,0,0,0.5)',
          '-webkit-box-shadow': '0 1px 3px rgba(0,0,0,0.5)',
          'text-shadow': '0 -1px 1px rgba(0,0,0,0.25)',
          'border-bottom': '1px solid rgba(0,0,0,0.25)',
          'position': 'relative',
          'cursor': 'pointer',
          'margin': '5px 10px',
          'font-size': '13px',
          'font-weight': 'bold',
          'line-height': 1,
          'text-shadow': '0 -1px 1px rgba(0,0,0,0.25)'
      },
      href: options.href,
      html: options.text
    });
  },
  behavior: function(options) {
    var self = $(this);
    
    self
    .hover(
      function() {
        self.css('background',options.hovercolor);
      },
      function() {
        self.css('background',options.color);
      }
    )
    .mousedown(function() {
      self.css('top','1px');
    })
    .mouseup(function() {
      self.css('top',null);
    })
    .mouseout(function() {
      self.css('top',null);
    });
  }
});

$.objects.define('new_button_creator', {
  behavior: function(options) {
    this.
    click(function() {
        var text = $('#button_text').attr('value');
        var color = $('#button_color').attr('value');
        var hcolor = $('#button_hovercolor').attr('value');

        var new_button = $.objects.make('button', { color:color, text:text, hovercolor:hcolor });
        $('body').append(new_button);
    });
  }
});

$(document).ready(function() {
  var new_button = $.objects.make('button', {color:'#768B99', hovercolor: '#999'}).behaveLike('new_button_creator');
  $('body').append(new_button);
});

