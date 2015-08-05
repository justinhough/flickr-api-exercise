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
  var results = '';

  $.getJSON(flickrUrl + query(params),
    function (data) {
      
      console.log(flickrUrl + query(params));
      
      $.each(data.photos.photo, function (i, item) {
        
        // append each image to variable results
        results += '<div id="'+item.id+'" class="flickr_img flickr_item">'+
          '<a href="'+item.url_l+'" title="'+item.title+'" data-lightbox="flickr" data-title="'+item.title+'">'+
            '<div class="flickr_img_wrapper" style="background-image:url('+item.url_m+');">'+
              //'<img src="'+item.url_m+'" alt="'+item.title+'" />'+
            '</div>'+
            '<div class="flickr_title_wrapper">'+
              '<h2 class="flickr_img_title">'+item.title+'</h2>'+
            '</div>'+
          '</a>'+
        '</div>';
        
      });
      
      $('#flickrContainer').html(results);
    }
  );
}

_getPhotos();