$.objects.define('photo_tile',{
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
        var photo_base = 'http://farm' + options.farm + '.static.flickr.com/' + options.server + '/' + options.id + '_' + options.secret +'_t.jpg';
        var photo_thumb = photo_base + '_t.jpg'
        var photo_url = photo_base + '.jpg'
        
        return $('<img/>',{
            src: photo_thumb,
            big_image: photo_url
        });
    },
    behavior: function(self) {
        self.click(function() {
            var big_image = $(self).attr('big_image')
            $('#image_holder').attr('src', big_image);
        });
    }
})


apiKey = '72b014c8881560f7370899e91d3a41aa'

$(document).ready(function() {
    $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=awesome&format=json&jsoncallback=?', function(data) {
        $.each(data.photos.photo,function(i,p) {
            var new_tile = $.objects.make('photo_tile', p);
            $('body').append(new_tile);
        });
    });
});
