/*!
 * jQuery engineer v0.9.8.7
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
  build: function(obj_reference, ops) {
    // find obj_def
    var obj_def = $.engineer._find(obj_reference);
    // merge options
    var options = $.extend(true, {}, obj_def.defaults, ops);
    // create dummy object to hold attributes
    var returned_attributes = {};
    // instantiate object
    new_obj = obj_def.structure.call(returned_attributes, options);
    // merge in dummy object
    $.extend(new_obj, returned_attributes);
    
    return new_obj;
  },
  make: function(obj_reference, ops) {
    var obj_def = $.engineer._find(obj_reference);
    // create object
    var new_obj = $.engineer.build(obj_def,ops);
    // add behavior
    $.engineer._applyBehavior(new_obj, obj_def, ops)
    
    return new_obj;
  },
  define: function(obj_reference, definition) {
    this[obj_reference] = $.extend(true, {}, this.default_object, definition);
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
    if (obj_def == undefined) { throw "The definition of '"+obj_reference+"' either failed to define or does not exist." };
    
    return obj_def;
  },
  _applyBehavior: function(obj, obj_def, ops) {
    var options = $.extend(true, {}, obj_def.defaults, ops);
    // apply behavior
    var publicMethods = obj_def.behavior.call(obj, options);
    // save public methods
    obj.data('publicMethods', publicMethods);
    // return new obj
    return obj;
  },
  _transform: function(objs, obj_reference, callback, ops) {
    // Utility funciton shared with makeInto and behaveLike
    var obj_def = $.engineer._find(obj_reference);

    objs.each(function(i,e) {
      var self = $(e);
      var options = {};
    
      // gather parameters from target
      for(var key in obj_def.defaults){
        if (self.attr(key)) {
          options[key] = self.attr(key);
        }
      }
      
      var merged_options = $.extend(true, {}, options, ops);

      var new_obj = callback(self, obj_def, merged_options);
      objs[i] = new_obj[0];
    });

    return objs;
  }
};

(function($){
 $.fn.makeInto = function(obj_reference) {
   return $.engineer._transform(this, obj_reference, function(obj, obj_def, options) {
      // make engineer object
      var new_obj = $.engineer.make(obj_def, options);
      // remove old, add new
      obj.before(new_obj).remove();
      
      return new_obj;
   });
 };
 
 $.fn.behaveLike = function(obj_reference, ops) {
    return $.engineer._transform(this, obj_reference, $.engineer._applyBehavior, ops);
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