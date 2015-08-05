// Flickr REST Url and API Key as variables
var flickr_URL = "https://api.flickr.com/services/rest/",
    API_KEY = '2aaa4bca5ad82a50eebeb80bd04f5564';
    
var params = {
  //'method': 'flickr.people.getPhotos',
  'method': 'flickr.photos.search',
  'api_key': API_KEY,
  'user_id': '132365033@N08', // IBM
  'extras': [
      'description',
      'date_upload',
      'date_taken',
      'owner_name',
      'icon_server',
      'geo',
      'tags',
      'machine_tags',
      'o_dims',
      'views',
      'media',
      'path_alias',
      'url_sq',
      'url_s',
      'url_m',
      'url_l',
      'url_o'
  ],
  'per_page': 8,
  'format': 'json',
  'nojsoncallback': '1'
}

// Join all arguments into string
function query(params) {
  var query_str = "?";
  for (var param_arg in params) {
    query_str += param_arg + "=" + (params[param_arg].constructor == Array ? params[param_arg].join(",") : params[param_arg]) + "&";
  }
  return query_str.substring(0, query_str.length - 1);
}


// One template for all images
function _flickrTemplate(data){
  
  var results = '';
  
  $.each(data.photos.photo, function (i, item) {

    // @todo: iterate through and divide into individual tags
    var tags = item.tags,
      sep_tags = tags.split(' '),
      tags_wrapper = '';    
    
    // if tags have values
    // divide tags based on the space between tags
    if (sep_tags != ''){
      ind_tags = '';
      // step through each tag and create an individual tag for it
      $.each(sep_tags, function (i, item) {
        ind_tags += '<span class="flickr_img_tag">'+sep_tags[i]+'</span>';
      });
      tags_wrapper = '<span class="flickr_img_tags">'+ind_tags+'</p>';
    }
    
    // append each result (image) to variable
    results += '<div id="'+item.id+'" class="flickr_item">'+
          '<a href="'+item.url_o+'" title="'+item.title+'" data-lightbox="flickr" data-title="'+item.title+'">'+
            '<div class="flickr_img_wrapper" style="background-image:url('+item.url_m+');"></div>'+
            '<div class="flickr_title_wrapper">'+
              '<h2 class="flickr_img_title">'+item.title+'</h2>'+
            '</div>'+
            tags_wrapper +
          '</a>'+
        '</div>';
    
  });

  $('#flickrContainer').html(results);

}


function _getPhotos(){
  $.getJSON(flickr_URL + query(params),
    function (data) {  
      
      //console.log(data);
      //console.log(flickr_URL + query(params));
          
      $.each(data.photos.photo, function (i, item) {
        _flickrTemplate(data);
      });
    }
  );
}

function _searchPhotos(tags){
  $.getJSON(flickr_URL + query(params) + '&tags='+tags,
    function (data) {
      if (data.photos.total != 0){
        _flickrTemplate(data);
      }
      else {
        result = '<p>No images returned for "'+tags+'".</p>';
        $('#flickrContainer').html(result);
      }
    }
  );
}

function _paginatePhotos(getPage){
  $.getJSON(flickr_URL + query(params) + '&page=' + getPage,
    function (data) {

      console.log(data);

      // Checking object
      var current_page = data.photos.page,
          total_pages = data.photos.pages,
          paging_items = '';
  
      // Check to see that there is more than one page
      if (total_pages > 1) {
        
        for(p = 0; p < total_pages; p++) {
          var page_number = p + 1;
          
          if (page_number == current_page){
            paging_items += '<a href="#" rel="'+p+'" class="paginate_current_item">'+page_number+'</a>';
          } else {
            paging_items += '<a href="#" onclick="_paginatePhotos('+page_number+')" rel="'+p+'">'+page_number+'</a>';
          }
        }
        
        $('#flickr_navigate .flickr_navigate_pages').html(paging_items);
        
        if(getPage != ''){          
          $.each(data.photos.photo, function (i, item) {
            _flickrTemplate(data);
          });
        }
      }
      
    // end of function(data)
    }
  );
}


$(document).ready( function(){
  
  // Generate images on load
  _getPhotos();
  _paginatePhotos('init');
  
  $('#search_tags').keyup(function(e) {
    if (e.keyCode == 13) {
      var sVal = $(this).val();
      console.log(sVal);
      
      if (!sVal){
        // do nothing
        _getPhotos();
      }
      else {
        _searchPhotos(sVal);
      }    
    }
  });
});
