$.objects.define('close_tab', {
  defaults: { closeable: $(this) },
  structure: function(options) {
    return $('<a/>',{html:'>', href:'#'});
  },
  behavior: function(self, options) {
    self
    .click(function(event) {
      event.preventDefault();
      options.closeable.toggle();
    });
  }
});

$.objects.define('box', {
  defaults: { header_text:'Box', body_text:'Hello' },
  structure: function(options) {
    var header = $('<div/>', {
      'class':'box_header',
      html: options.header_text
    });
    
    var body = $('<div/>', {
      'class':'box_body',
      html: options.body_text
    });
  
    var box = $('<div/>', {
      'class':'box'
    }).append(header).append(body)
    
    box.head = header;
    box.body_content = body;
    
    return box;
  }
});

$(document).ready(function() {
  var somecontent = 'Well hello there internet user. Did you know that the internet is a bunch of tubes? Well it is so be careful not to fill up the tubes';
  var new_box = $.objects.make('box', {header_text:'Howdy', body_text: somecontent});
  $('body').append(new_box);
  
  var close_tab = $.objects.make('close_tab', { closeable:new_box.body_content} );
  new_box.head.prepend(close_tab);
  
  $('.close_thingy').behaveLike('close_tab', {closeable:$('whatever')});
});