$.objects.define('slick_rick', {
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
  
  behavior: function(self) {
    self.click(function() { 
      $(this).animate({
          width:  ["+=50px", "swing"],
          height: ["+=30px", "swing"]
        }, 
      2000).
      append("<p>:D</p>").show('slow');
    });
  }
});

$(function() {
  $('input.add_a_new_object').click(function() {
    var new_slick_rick = $.objects.make('slick_rick');
    $(this).siblings('.example_target').append(new_slick_rick).show("slow");
  });
  
  $('input.decorate_an_object').click(function() {
     $('#example_div').makeInto('slick_rick');
  });
});