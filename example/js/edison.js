$.engineer.define('gbutton', {
  defaults: {
    normal: {
      gradient_top: "#F9F9F9",
      gradient_middle: "#EEE",
      gradient_bottom: "#E3E3E3",
      border_color: "#939393"
    },
    hover: {
      gradient_top: "#F9F9F9",
      gradient_middle: "#EEE",
      gradient_bottom: "#E3E3E3",
      border_color: "#BCBCBC"
    },
    click: {
      gradient_top: "#E3E3E3",
      gradient_middle: "#EEE",
      gradient_bottom: "#E3E3E3",  
      border_color: "#333"
    },
    text: "Click Me"
  },
  structure: function(options) {
    var text_div = $('<div/>', {
      'class':'gbuttontextdiv',
      css: {
        'color': "black",
        'line-height': "1.8em",
        'padding': "0px 8px",
        'text-align':'center', 
        'position':'relative',
        'vertical-align':'middle',
        'white-space':'nowrap'
      },
      html: options.text
    });
    
    var top_gradient = $('<div/>', {
      'class':'gbuttontopgradient',
      css: {
        'background':options.normal.gradient_top, 
        'border-bottom':'0.2em solid '+options.normal.gradient_middle,
        'height':'0.9em',
        'left':'0px',
        'overflow':'hidden',
        'position':'absolute',
        'right': '0px',
        'top':'0px',
        'display':'block'
      }
    });
    
    var content_div = $('<div/>',{
      css: {
        'height':'100%', 
        'position':'relative',
        'display':'block'
      },
      html: text_div
    });
    
    content_div.prepend(top_gradient);
    
    var vborder = $('<div/>',{
      'class':'gbuttonvborder',
      css: {
        'background':options.normal.gradient_bottom,
        'border-color': options.normal.border_color,
        'border-width':'0px 1px',
        'border-style':'solid',
        'padding':'0px',
        'margin':'0px -1px',
        'line-height': 'normal',
        'cursor':'pointer',
        'display':'inline-block',
        'position':'relative'
      },
      html: content_div
    });
    
    var hborder = $('<div/>',{
      'class':'gbuttonhborder',
      css: {
        'border-color': options.normal.border_color,
        'border-width':'1px 0px',
        'border-style':'solid',
        'padding':'0px',
        'margin':'0px',
        'line-height': '0',
        'display':'inline-block',
        'position':'relative'
      },
      html: vborder
    });
    
    var container_div = $('<div/>', {
      css: {
        '-webkit-user-select': 'none',
        'vertical-align':'middle',
        'display':'inline-block',
        'position':'relative',
        'margin':'0px',
        'padding':'0px',
        'outline':'none'
      },
      html: hborder
    });
    
    return container_div;
  },
  behavior: function(options) {
    var self = this;
    var vborder = $('.gbuttonvborder', this);
    var hborder = $('.gbuttonhborder', this);
    var top_gradient = $('.gbuttontopgradient', this);
    var text_div = $('.gbuttontextdiv', this);
    
    self
    .hover(
      function() {
        vborder.css('border-color',options.hover.border_color);
        hborder.css('border-color',options.hover.border_color);
      },
      function() {
        vborder.css('border-color',options.normal.border_color);
        hborder.css('border-color',options.normal.border_color);
      }
    )
    .mousedown(function() {
      vborder.css('border-color',options.click.border_color);
      hborder.css('border-color',options.click.border_color);
      top_gradient.css('border-color',options.click.gradient_middle);
      top_gradient.css('background',options.click.gradient_top);
      vborder.css('background',options.click.gradient_bottom);
    })
    .mouseup(function() {
      vborder.css('border-color',options.normal.border_color);
      hborder.css('border-color',options.normal.border_color);
      top_gradient.css('border-color',options.normal.gradient_middle);
      top_gradient.css('background',options.normal.gradient_top);
      vborder.css('background',options.normal.gradient_bottom);
    })
    .mouseout(function() {
      vborder.css('border-color',options.normal.border_color);
      hborder.css('border-color',options.normal.border_color);
      top_gradient.css('border-color',options.normal.gradient_middle);
      top_gradient.css('background',options.normal.gradient_top);
      vborder.css('background',options.normal.gradient_bottom);
    });
  }
});

$.engineer.define('gbutton_spacer',{
  structure: function(options) {
    return $('<div/>', {
      css: {
        'display':'inline-block',
        'position': "relative",
        'margin':"0px 5px" 
      },
      html: '&nbsp;'
    });
  }
})
