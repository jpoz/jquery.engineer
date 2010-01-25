$.objects = {
  make: function(selector){
    return {
      objs: $(selector),
      behaveLike: function(obj_type) {
        this.objs.each(function() {
          var obj_def = $.objects[obj_type];
          obj_def.behavior($(this));
        })
      }
    }
  },
  create: function(obj_type) {
    return {
      obj_def: this[obj_type],
      from: function(selector) {
        // save target object definiton
        var obj_def = this.obj_def;
        
        $(selector).each(function() {
          var options = {}
          
          // gather parameters from target
          for(var key in obj_def.defaults){
            options[key] = $(this).attr(key);
          }
          new_obj = obj_def.structure(options);
          obj_def.behavior(new_obj);
          
          // remove temp, add new
          $(this).before(new_obj).remove();
        });
        
      }
    }
  }
}