$.engineer.define('example_button', {
  defaults: { color: '#336699', innerText: "This element" },
  structure: function(options) {
    return $('<div/>', {
      css: {
        'text-align':'center', 'background':options.color, 'color':'white', 
        'padding':'5px', 'margin':'5px', 'display': 'inline'
      },
      html: options.innerText
    });
  },
  behavior: function(options) {
    var self = this;
    
    self.click(function() {
      self.animate({ opacity: 0.4 }, 1500 );
    });
  }
});

$.engineer.define('blinky', {
  behavior: function(options) {
    var self = this;
    var publicMethods = {};
    
    publicMethods.blink = function() {
      self.fadeOut(100).fadeIn(200);
    }

    return publicMethods;
  }
});

$.engineer.define('gbutton_link', {
  defaults: {href:'/', text:'Click Me'},
  structure: function(options) {
    return $.engineer.make('gbutton', options)
    // gbutton is part of the edison library http://github.com/jpoz/edison
  },
  behavior: function(options) {
    this.click(function() {
      window.location = options.href
    })
  }
});


$(document).ready(function() {
  $('.ex1').append(
    $.engineer.make('gbutton', {text: "This button"})
  );
  
  $('.ex2')
  .append($.engineer.make('example_button'))
  .append($.engineer.make('example_button', {innerText:"this element"}))
  .append($.engineer.make('example_button', {innerText:"and"}))
  .append($.engineer.make('example_button', {color:"#994547", innerText:"this element"}));
  
  $('.ex3')
  .append($.engineer.make('gbutton', {text:"This button will send all the other elements a message"}).click(function() {
        $('div').send('blink');
      })
  )
  .append('<br/>').append('<br/>')
  .append($.engineer.make('example_button', {innerText:"A"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:" "}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"B"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"U"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"N"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"C"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"H"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:" "}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"O"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"F"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:" "}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"D"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"I"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"V"}).behaveLike('blinky') )
  .append($.engineer.make('example_button', {innerText:"S"}).behaveLike('blinky') );

  $('.ex4')
  .append($.engineer.make('gbutton', {text:"$('p').behaveLike('blinky');"}).click(function() {
        $('p').behaveLike('blinky');
      })
  )
  .append($.engineer.make('gbutton', {text:"$('p').send('blink');"}).click(function() {
        $('p').send('blink');
  }));

  $('.ex5')
  .append($.engineer.build('gbutton', {text:"I don't do anything"}));
  
  $('.ex6')
  .append($.engineer.make('gbutton', {text:"$('a').makeInto('gbutton_link')"}).click(function() {
        $(this).siblings('a').makeInto('gbutton_link');
      })
  );
  
  $('.ex7')
  .append(
      $.engineer.make('gbutton', {text:"Ajax get for JSON"})
        .click(function() {
          var button = $(this);
          
          $.getJSON('buttons.json', function(users) {
            var target_div = $('#users');
            
            $.each(users, function(i, user) {
              target_div.append(
                $.engineer.make('gbutton_link', {
                  "text":user['name'],
                  "href":user['website'] 
                })
              );
            })
          })
        })
  );
});