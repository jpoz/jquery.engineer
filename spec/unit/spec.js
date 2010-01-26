
describe '$.objects'
  before_each
    $.objects.butter = {
      defaults: {
        'brand':'Kraft'
      },
      structure: function(options) {
        return $('<div/>', {
          id:'awesome',
          css: {
            display:'none'
          },
          html: options.brand
        });
      },
      behavior: function(self) {
        self
          .click(function() {
            $(this).html('I got clicked!')
          });
      }
    };
  end
  
  describe '.make()'
    it 'should return a new default representation of the class'
      var new_butter = $.objects.make('butter').toString();
      var factory_representation = $.objects.butter.structure($.objects.butter.defaults).toString();
      new_butter.should.equal factory_representation
    end
    
    it 'should add behavior to the new default representation'
      var new_butter = $.objects.make('butter')
      new_butter.click.should.be_a Function
      new_butter.click()
      new_butter.html().should.equal 'I got clicked!'
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
        var new_butter = $.objects.make(def).toString();
        var factory_representation = $.objects.butter.structure($.objects.butter.defaults).toString();
        
        new_butter.should.equal factory_representation
      end
    end
  end

  describe '.create()'
    it 'should return an object with the object defintion'
      $.objects.create('butter').obj_def.should.equal $.objects.butter
    end
    
    it 'should return an object with a from function'
      $.objects.create('butter').from.should.be_a Function
    end
    
    describe '.from()'
  
      describe 'given an object'
        it 'should return a new instance'
          var options = {'brand':'Dairy Gold'};
          var temp_object = $('<div/>', {'brand':'Dairy Gold'});
          $.objects.create('butter').from(temp_object).toString().should.eql $.objects.butter.structure(options).toString()
        end
        
        it 'should fall back to defaults if the object given does not have an attribute'
          var temp_object = $('<div/>');
          var new_butter  = $.objects.create('butter').from(temp_object).html()
          var factory_representation = $.objects.butter.structure($.objects.butter.defaults).html()

          new_butter.should.equal factory_representation
        end
      end
      
      describe 'given a selector'
        it 'should replace all objects found by the selector with new instances'
          var temp_object = $('<div/>', {'class':'new_butter', 'brand':'Albertsons'});
          $('body').append(temp_object);
          
          $.objects.create('butter').from('.new_butter');
          
          $('#awesome').html().should.eql('Albertsons')
        end
      end
    end
  end

end