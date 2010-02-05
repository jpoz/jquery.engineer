/*!
 * jQuery objects v0.9.6.7
 *
 * Copyright 2010, James Pozdena
 *
 */

$.objects = {
  default_object: {
    defaults: {},
    structure: function(options) {},
    behavior: function(options) {}
  },
  make: function(obj_reference, ops) {
    var obj_def;
    // save obj_def
    if ( typeof obj_reference == 'object') {
      obj_def = obj_reference;
    } else {
      obj_def = $.objects[obj_reference];
    }
    
    // merge options
    var options = $.extend(true, {}, obj_def.defaults, ops);
    // create dummy object to hold attributes
    var returned_attributes = {};
    // instantiate object
    new_obj = obj_def.structure.call(returned_attributes, options);
    // merge in dummy object
    $.extend(new_obj, returned_attributes);
    
    // add behavior
    new_obj.behaveLike(obj_def, options)
    
    return new_obj;
  },
  define: function(obj_reference, definition) {
    this[obj_reference] = $.extend(true, {}, this.default_object, definition);
  }
};

(function($){
 $.fn.makeInto = function(obj_type) {
    var obj_def = $.objects[obj_type];

    return this.each(function() {
      var self = $(this);
      var options = {};
    
      // gather parameters from target
      for(var key in obj_def.defaults){
        if (self.attr(key)) {
          options[key] = self.attr(key);
        }
      }
      new_obj = $.objects.make(obj_def, options);
    
      // remove temp, add new
      self.before(new_obj).remove();      
    });
 };
 
 $.fn.behaveLike = function(obj_reference, ops) {
    var obj_def;
    // save obj_def
    if ( typeof obj_reference == 'object') {
      obj_def = obj_reference;
    } else {
      obj_def = $.objects[obj_reference];
    }
    
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
      j = i++; 
      args[j] = arguments[i];
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
