$.engineer.define('photo_tile',{
    defaults: {
        farm: 5,
        id: "4311172196",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "42536596@N00",
        secret: "beb74dcf10",
        server: "4022",
        title: "_MG_1030",
    },
    structure: function(options) {
        var photo_base = 'http://farm' + options.farm + '.static.flickr.com/' + options.server + '/' + options.id + '_' + options.secret;
        var photo_thumb = photo_base + '_t.jpg'
        var photo_url = photo_base + '.jpg'
        
        return $('<img/>',{
            src: photo_thumb,
            'class': 'photo_tile',
            big_image: photo_url
        });
    },
    behavior: function(options) {
        $(this).click(function() {
            var big_image = $(this).attr('big_image')
            $('#image_holder').attr('src', big_image);
        });
    }
});

$.engineer.define('photo_search_box', {
  structure: function(options) {
    var input_button = $('<input/>', {type:'submit', value:'Search'});
    var search_box   = $('<input/>', {id:'photo_search', value:'awesome'});
    return $('<form/>', { html: search_box}).append(input_button);
  },
  behavior: function(options) {
    var self = this;
    var publicMethods = {};
    
    publicMethods.getImagesFromTag = function(searchTag) {
      $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + searchTag + '&format=json&jsoncallback=?', function(data) {
          $.each(data.photos.photo,function(i,p) {
              var new_tile = $.engineer.make('photo_tile', p);
              $('body').append(new_tile);
          });
      });
    }
    
    self.submit(function(event) {
      event.preventDefault();
      $('.photo_tile').remove();
      var searchTag = $('#photo_search').attr('value');
      publicMethods.getImagesFromTag(searchTag);
    });
    
    return publicMethods;
  }
});


apiKey = '72b014c8881560f7370899e91d3a41aa'
searchTag = 'awesome'

$(document).ready(function() {
    var search = $.engineer.make('photo_search_box');
    search.send('getImagesFromTag','awesome');
    $('body').append(search);
});
