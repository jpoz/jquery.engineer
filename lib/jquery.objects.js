/*!
 * jQuery objects v0.9
 *
 * Copyright 2010, James Pozdena
 *
 */

$.objects = {
  default_object: {
    defaults: {},
    structure: function(options) {},
    behavior: function(self){}
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
    
    // instantiate object
    var returned_attributes = {};
    new_obj = obj_def.structure.call(returned_attributes, options);
    $.extend(new_obj, returned_attributes);
    
    // add behavior
    obj_def.behavior(new_obj, options);
    
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
 
 $.fn.behaveLike = function(obj_type) {
    var obj_def = $.objects[obj_type];
 
    return this.each(function() {
      obj_def.behavior($(this));
    });
 };
})(jQuery);
