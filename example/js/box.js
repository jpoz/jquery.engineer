$.engineer.define('close_tab', {
  defaults: { closeable: $(this) },
  structure: function(options) {
    return $('<a/>',{html:'>', href:'#'});
  },
  behavior: function(options) {
    this
    .click(function(event) {
      event.preventDefault();
      options.closeable.toggle();
    });
  }
});

$.engineer.define('box', {
  defaults: { header_text:'Box', body_text:'Hello' },
  structure: function(options) {
    this.header = $('<div/>', {
      'class':'box_header',
      html: options.header_text
    });
    
    this.body_content = $('<div/>', {
      'class':'box_body',
      html: options.body_text
    });
  
    return $('<div/>', {
      'class':'box'
    }).append(this.header).append(this.body_content);
  }
});

$(document).ready(function() {
  var somecontent = 'Well hello there internet user. Did you know that the internet is a bunch of tubes? Well it is so be careful not to fill up the tubes';
  var new_box = $.engineer.make('box', {header_text:'Howdy', body_text: somecontent});
  $('body').append(new_box);
  
  var close_tab = $.engineer.make('close_tab', { closeable:new_box.body_content} );
  new_box.header.prepend(close_tab);
  
  $('.close_thingy').behaveLike('close_tab', {closeable:$('whatever')});
});