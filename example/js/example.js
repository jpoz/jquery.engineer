$.engineer.define('slick_rick', {
  defaults: { 'innertext':'click me' },
  
  structure: function(options) {
    return $("<div />", {
      css: {
        border: "1px dashed #f0f3fa",
        padding: ".25em",
        height: "25px",
        width: "100px",
        padding: "5px 5px 5px 5px",
        color: "#f3f0f3"
      },
      html: "<p>slick rick wants you to " + options.innertext + "</p>"
    });
  },
  
  behavior: function(options) {
    var self = this;
    self.click(function() { 
      self.animate({
          width:  ["+=50px", "swing"],
          height: ["+=30px", "swing"]
        }, 
      2000).
      append("<p>:D</p>").show('slow');
    });
  }
});

$.engineer.define('buddy', {
  defaults: {},
  behavior: function( ){
    this.click(function() {
      alert("I'm your buddy");
    });
  }
});

$(function() {
  $('input.add_a_new_object').click(function() {
    var new_slick_rick = $.engineer.make('slick_rick');
    $(this).siblings('.example_target').append(new_slick_rick).show("slow");
  });
  
  $('input.decorate_an_object').click(function() {
     $('#example_div').makeInto('slick_rick').behaveLike('buddy');
  });
});