$.engineer.define('message_box',{
  defaults: {html:""},
  structure: function(options) {
    return $('<div/>', { html: options.html, css: { padding: '30px', border: '1px solid black' } });
  },
  behavior: function(options) {
    var self = this;
    
    self
    .click(function(event){
      event.stopPropagation();
      self.send('parentClicked');
      $('div', this).send('parentClicked');
    });
    
    return ({
      parentClicked: function() {
        if (self.data('clicked')) {
          self.css('background','white');
          self.data('clicked',false);
        } else {
          self.css('background','red');
          self.data('clicked',true);
        }
      }
    });
  }
});


$(document).ready(function() {
  var boxes = $.engineer.make('message_box',{
    html: $.engineer.make('message_box',{
      html: $.engineer.make('message_box',{
        html: $.engineer.make('message_box',{
          html: $.engineer.make('message_box')
        })
      })
    })
  });
  
  $('body').prepend(boxes);
});
