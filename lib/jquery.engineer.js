/*!
 * jQuery engineer v0.9.8
 *
 * Copyright 2010, James Pozdena
 *
 */

$.engineer = {
  default_object: {
    defaults: {},
    structure: function(options) {},
    behavior: function(options) {}
  },
  _find: function(obj_reference) {
    var obj_def;
    // save obj_def
    if ( typeof obj_reference == 'object') {
      obj_def = obj_reference;
    } else {
      obj_def = $.engineer[obj_reference];
    }
    // Show descriptive error message
    if (obj_def == undefined) { throw "The definition of "+obj_reference+" either failed to define or does not exist." };
    
    return obj_def;
  },
  build: function(obj_reference, ops) {
    var obj_def = $.engineer._find(obj_reference);
    // merge options
    var options = $.extend(true, {}, obj_def.defaults, ops);
    // create dummy object to hold attributes
    var new_obj = obj_def.structure(options);
    
    return new_obj;
  },
  make: function(obj_reference, ops) {
    var obj_def = $.engineer._find(obj_reference);
    // create object
    var new_obj = $.engineer.build(obj_def,ops);
    // add behavior
    new_obj.behaveLike(obj_def, ops)
    
    return new_obj;
  },
  define: function(obj_reference, definition) {
    this[obj_reference] = $.extend(true, {}, this.default_object, definition);
  }
};

(function($){
 $.fn.makeInto = function(obj_type) {
    var obj_def = $.engineer[obj_type];
    var objs = this;
    this.each(function(i,e) {
      var self = $(e);
      var options = {};
    
      // gather parameters from target
      for(var key in obj_def.defaults){
        if (self.attr(key)) {
          options[key] = self.attr(key);
        }
      }
      new_obj = $.engineer.make(obj_def, options);
    
      // remove old, add new
      self.before(new_obj).remove();
      
      objs[i] = new_obj[0];
    });

    return objs;
 };
 
 $.fn.behaveLike = function(obj_reference, ops) {
    var obj_def = $.engineer._find(obj_reference);

    var options = $.extend(true, {}, obj_def.defaults, ops);

    return this.each(function() {
      var _this = $(this);
      var publicMethods = obj_def.behavior.call(_this, options);
      _this.data('publicMethods', publicMethods);
    });
 };
 
  $.fn.send = function(message) {
    var args = [];
    var i = 0;
    
    //shift arguments
    while ( i < arguments.length ) {
      j = i++; args[j] = arguments[i];
    }
    
    return this.each(function() {
      // get public methods
      var publicMethods = $(this).data('publicMethods');
      if (publicMethods) {
        // find method
        method = publicMethods[message];
        if (method) {
          // apply method with remaining arguments passed to send()
          method.apply(method, args);
        }
      }
    });
 };
})(jQuery);

