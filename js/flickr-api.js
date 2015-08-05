// URL Example
// https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2aaa4bca5ad82a50eebeb80bd04f5564&user_id=132365033@N08&extras=description,date_upload,date_taken,owner_name,icon_server,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_s,url_m,url_l,url_o&per_page=12&format=json&nojsoncallback=1


// Flickr REST Url and API Key as variables
var flickrUrl = "https://api.flickr.com/services/rest/",
    API_KEY = '2aaa4bca5ad82a50eebeb80bd04f5564';
    

function _getPhotos(){
  $.getJSON(flickrUrl + '?method=flickr.people.getPhotos&api_key='+API_KEY+'&user_id=132365033@N08&extras=description,date_upload,date_taken,owner_name,icon_server,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_s,url_m,url_l,url_o&per_page=12&format=json&nojsoncallback=1',
    function (data) {
      
      var results = '';
      
      console.log(data);
      
      $.each(data.photos.photo, function (i, item) {
        
        results = '<div id="' + item.id + '" class="flickr_item">'+
                      '<img src="' + item.url_m + '" alt="' + item.title + '" />'+
                      '<h2 class="flickr_img_title">' + item.title + ' - ' + item.id + '</h2>'+
                    '</a>'+
                  '</div>';
        
        
        $('#flickrContainer').append(results);
        
      });
    }
  );
}

_getPhotos();