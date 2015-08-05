function _getPhotos(){
  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2aaa4bca5ad82a50eebeb80bd04f5564&user_id=132365033@N08&extras=description,date_upload,date_taken,owner_name,icon_server,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_s,url_m,url_l,url_o&per_page=12&format=json&nojsoncallback=1',
    function (data) {
      $.each(data.photos.photo, function (i, item) {
        
        results = '<img src="'+item.url_m+'" alt="'+item.title+'" />';
        
        $('#flickrContainer').append(results);
        
      });
    }
  );
}

_getPhotos();