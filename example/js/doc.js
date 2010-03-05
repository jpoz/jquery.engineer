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
        $('*').send('blink');
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
        $('*').send('blink');
  }));

});