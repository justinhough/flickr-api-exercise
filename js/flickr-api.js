// Flickr REST Url and API Key as variables
var flickrUrl = "https://api.flickr.com/services/rest/",
    API_KEY = '2aaa4bca5ad82a50eebeb80bd04f5564';
    
var params = {
  "method": "flickr.people.getPhotos",
  "api_key": API_KEY,
  "user_id": '132365033@N08', // IBM
  "extras": [
      "description",
      "date_upload",
      "date_taken",
      "owner_name",
      "icon_server",
      "geo",
      "tags",
      "machine_tags",
      "o_dims",
      "views",
      "media",
      "path_alias",
      "url_sq",
      "url_s",
      "url_m",
      "url_l",
      "url_o"
  ],
  "per_page": 12,
  "format": "json",
  "nojsoncallback": "1",
}


function query(params) {
  var query_str = "?";
  for (var param_arg in params) {
    query_str += param_arg + "=" + (params[param_arg].constructor == Array ? params[param_arg].join(",") : params[param_arg]) + "&";
  }
  return query_str.substring(0, query_str.length - 1);
}


function _getPhotos(){
  $.getJSON(flickrUrl + query(params),
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