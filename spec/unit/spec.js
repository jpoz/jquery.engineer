
describe '$.objects'
  before_each
    $.objects.define('butter', {
      defaults: {
        'brand':'Kraft'
      },
      structure: function(options) {
        this.fat_content = '12g';
        
        return $('<div/>', {
          id:'awesome',
          css: {
            display:'none'
          },
          html: options.brand
        });
      },
      behavior: function(options) {
        $(this)
          .click(function() {
            $(this).html('I got clicked!')
          });
      }
    });
  end
  
  describe '.define()'
    it 'should define a new object'
      $.objects.define('milk', {
        defaults: {},
        structure: function(options) { $('<div/>'); },
        behavior: function(self) {}
      });
      
      $.objects.milk.should.not.be_undefined;
    end
    
    it 'should have all configurations have defaults'
      $.objects.define('milk', {});
      
      $.objects.milk.should.not.be_undefined;
      $.objects.milk.defaults.should.not.be_undefined;
      $.objects.milk.structure.should.not.be_undefined;
      $.objects.milk.behavior.should.not.be_undefined;
    end
    
    it 'should not override another definition'
      $.objects.define('milk', {
        defaults: {},
        structure: function(options) { return $('<div/>'); },
        behavior: function(self) {}
      });
      
      $.objects.define('not_milk', {
        structure: function(options) { return $('<span/>'); },
      });
      
      $.objects.milk.should.not.be_undefined;
      returned_object = $.objects.milk.structure({});
      returned_object[0]['HTMLBodyElement'].should.eql($('<div/>')[0]['HTMLBodyElement'])
    end
  end
  
  describe '.make()'
    it 'should return a new default representation of the class'
      var new_butter = $.objects.make('butter').toString();
      var factory_representation = $.objects.butter.structure($.objects.butter.defaults).toString();
      new_butter.should.equal factory_representation
    end
    
    it 'should add behavior to the new default representation'
      var new_butter = $.objects.make('butter');
      new_butter.click.should.be_a Function
      new_butter.click()
      new_butter.html().should.equal 'I got clicked!'
    end
    
    it 'should call itself in the context of the object getting returned'
      var new_butter = $.objects.make('butter');
      new_butter.fat_content.should.eql('12g');
    end
    
    it 'should set the context of behavior to the returned object make by the strucure'
        $.objects.milk.behavior = function() { return this.behavior_context = this }
        
        var new_milk = $.objects.make('milk');
        new_milk.behavior_context.should.eql(new_milk);
    end
    
    describe 'given and object literal as the second argument'
      it 'should create a new representation with the object literal as the options'
        var new_butter = $.objects.make('butter', {'brand':'Butterzilla'});
        new_butter.html().should.eql('Butterzilla');
      end
    end
    
    describe 'given an object definition'
      it 'should return a new default representation from the given definition'
        var def = $.objects.butter;
        var new_butter = $.objects.make(def) + "";
        var factory_representation = $.objects.butter.structure($.objects.butter.defaults) + "";
        
        new_butter.should.equal factory_representation
      end
    end
    
  end
  
  describe '$().makeInto()'
    it 'should replace given selector with an instance of the object'
      $('body').append('<div id="butter_holder" brand="Sweet Cream"></div>');
      
      $('#butter_holder').makeInto('butter');
      $('#butter_holder').length.should.eql 0
    end
  end
  
  describe '$().behaveLike()'
    it 'should add the behavior of the object'
      $('body').append('<div id="butter_holder" brand="Sweet Cream"></div>');
      
      $('#butter_holder').behaveLike('butter');
      $('#butter_holder').click.should.be_a Function
    end
    
    it 'should allow the addition of keys on the javascript object'
      $.objects.define('taco',{
        behavior: function(options) {
          this.filling = 'WHO IS YOUR DADDY?';
        }
      });
      
      var butter_holder = $('#butter_holder');
      butter_holder.behaveLike('taco');
      butter_holder.filling.should.eql('WHO IS YOUR DADDY?');
    end
  end
end