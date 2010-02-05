$.objects.define('image_box',{
    behavior: function(options) {
      var self = $(this);
      
      this.closeMe = function() {
        self.fadeOut(1000);
      }
      
      this.openMe = function() {
        self.fadeIn(1000);
      }
      
    }
});

$.objects.define('text_box',{
    behavior: function(options) {
      var self = $(this);

      this.closeMe = function() {
        self.fadeOut(100);
      }
      
      this.openMe = function() {
        self.fadeIn(100);
      }
      
    }
});

$.objects.define('close_all',{
    behavior: function(options) {
      var self = $(this);
      
      self.click( function(event) {
        event.preventDefault();
        $('div').send('closeMe');
      });
    }
});


$.objects.define('open_all',{
    behavior: function(options) {
      var self = $(this);
      
      self.click( function(event) {
        event.preventDefault();
        $('div').send('openMe');
      });
    }
});

$(document).ready(function() {
  $('.image_box').behaveLike('image_box');
  $('.text_box').behaveLike('text_box');

  $('#close_all').behaveLike('close_all');
  $('#open_all').behaveLike('open_all');
});
