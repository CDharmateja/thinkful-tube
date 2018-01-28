var GITHUB_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
searchTerm = "Thinkful";

function getDataFromApi(searchTerm, callback) {
    var settings = {
        url: GITHUB_SEARCH_URL,
        data: {
        part: 'snippet',
        key: 'AIzaSyC2iHFV5hPCLtvv3HYhXf7vGJa_ncE7jXI',
        q: 'thinkful'
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}


function renderResult(result) {
    if (result.id.videoId)
    return `
      <div>
        <h2><a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">${result.snippet.title}</a></h2>
        <a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
          <img class="js-result-name" src="${result.snippet.thumbnails.default.url}">
        </a>
      </div>
    `;
    else
    return `
      <div>
        <h2><a target="_blank" href="https://www.youtube.com/channel/${result.id.channelId}">${result.snippet.title}</h2>
        <a target="_blank" href="https://www.youtube.com/channel/${result.id.channelId}">
          <img class="js-result-name" src="${result.snippet.thumbnails.default.url}">
        </a>
      </div>
    `;
    console.log(result.snippet)
    return '<img class="js-result-name" src="' + result.snippet.thumbnails.default.url   + '">'
  }
  
  function displayGitHubSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }
  
  function watchSubmit() {
    $('.js-search-form').submit(event => {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('.js-query');
      const query = queryTarget.val();
      // clear out the input
      queryTarget.val("");
      getDataFromApi(query, displayGitHubSearchData);
    });
  }
  
  $(watchSubmit);