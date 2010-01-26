/*!
 * jQuery objects v0.1
 *
 * Copyright 2010, James Pozdena
 *
 */

$.objects = {
  make: function(obj_reference, ops){
    // save obj_def
    if ( typeof obj_reference == 'object') {
      var obj_def = obj_reference;
    } else {
      var obj_def = $.objects[obj_reference];
    }
    
    // merge options
    var options = $.extend(obj_def.defaults,ops);
    
    // instantiate object
    new_obj = obj_def.structure(options);
    
    // add behavior
    obj_def.behavior(new_obj);
    
    return new_obj;
  },
  create: function(obj_type) {
    return {
      obj_def: this[obj_type],
      from: function(obj_reference) {
        
        if ( typeof obj_reference == 'string') {
          var elements = $(obj_reference);
        } else {
          var elements = [obj_reference];
        }
        
        // save target object definiton
        var obj_def = this.obj_def;
        
        $.each(elements, function() {
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

        return new_obj;
      }
    }
  }
}