$.engineer.define('button', {
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
    }
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
      }
    });
  }
})

$.engineer.define('new_button_creator', {
  behavior: function(options) {
    this.
    click(function() {
        var text = $('#button_text').attr('value');

        var new_button = $.engineer.make('gbutton', { text:text });
        $('body').append(new_button);
    });
  }
});

$.engineer.define('new_spacer_creator', {
  behavior: function(options) {
    this.
    click(function() {
        var new_button = $.engineer.make('gbutton_spacer');
        $('body').append(new_button);
    });
  }
});

$(document).ready(function() {
  var new_button = $.engineer.make('gbutton',  { text:'Add button' }).behaveLike('new_button_creator');
  var new_spacer = $.engineer.make('gbutton',  { text:'Add spacer' }).behaveLike('new_spacer_creator');

  $('body')
  .append(new_button)
  .append(new_spacer);
});

