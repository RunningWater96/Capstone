"use strict";

var button = document.getElementById('btn_submit');
button.addEventListener('click', function loadDoc() {
  var input = document.getElementById('song_search');
  var song = document.getElementById('song_list');
  var artists = document.getElementById('artist_list');
  var relSongs = document.getElementById('related_songs');
  song.innerHTML = '<div>Found Songs</div>';
  artists.innerHTML = '<div>Related Artists</div>';
  relSongs.innerHTML = '<div>Related Songs</div>';
  var jsonObj;
  var myHeaders = new Headers();
  var token = 'BQA8Zt7n7I9wf9I-QBXUJ_iVm0qok0z2LFdQnflXnWklcqImK67yjuVm2IhplFJTZUnIPqszrugIuhjj15NIbLRLaIW39BxT4c8qjqe09BDNb5WCT1Mgpyi9A7MFRv7p9Qv3-BX2-pqLki9ZfvuccXD1OhzZDfcWg1sYK6J6bWggkvc';
  myHeaders.append("Authorization", "Bearer " + token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch("https://api.spotify.com/v1/search?query=".concat(input.value, "&type=track&limit=30"), requestOptions).then(function (responseA) {
    return responseA.json();
  }).then(function (resultA) {
    console.log(resultA);
    jsonObj = resultA;

    for (var i = 0; i < jsonObj.tracks.limit; i++) {
      console.log(jsonObj.tracks.items[i]);
      fetch("https://api.spotify.com/v1/recommendations?seed_tracks=".concat(resultA.tracks.items[i].id, "&limit=1"), requestOptions).then(function (responseB) {
        return responseB.json();
      }).then(function (resultB) {
        console.log(resultB);

        for (var j = 0; j < resultB.tracks.length; j++) {
          artists.innerHTML += "<li id=artist".concat(j, "> <a href=").concat(resultB.tracks[j].artists[0].external_urls.spotify, ">").concat(resultB.tracks[j].artists[0].name, "</a></li>");
          relSongs.innerHTML += "<li id=song".concat(j, "> <a href=").concat(resultB.tracks[j].album.external_urls.spotify, ">").concat(resultB.tracks[j].name, "</a></li>");
        }
      });
      song.innerHTML += "\n        <li id=song".concat(i, "> <a href=").concat(resultA.tracks.items[i].album.external_urls.spotify, ">").concat(resultA.tracks.items[i].name, "</a> By ").concat(resultA.tracks.items[i].artists[0].name, "</li>\n        <br>\n        ");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});
button.addEventListener('click', function moviesReturn() {
  var input = document.getElementById("song_search");
  var out = document.getElementById("movieReturn");
  out.innerHTML = '<div>Found Movies</div>';
  fetch("https://api.themoviedb.org/3/search/movie?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=".concat(input.value, "&page=1&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result);

    for (var i = 0; i < result.results.length; i++) {
      var search = result.results[i].original_title;
      out.innerHTML += "<li><a href=".concat('https://google.com/search?q=' + search.split(' ').join('+'), " target=#>").concat(result.results[i].original_title, "</a></li>");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});
button.addEventListener('click', function televisionReturn() {
  var input = document.getElementById("song_search");
  var out = document.getElementById("tvShows");
  out.innerHTML = '<div>Television Shows</div>';
  fetch("https://api.themoviedb.org/3/search/tv?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=".concat(input.value, "&page=1&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result);

    for (var i = 0; i < result.results.length; i++) {
      var search = result.results[i].name;
      out.innerHTML += "<li><a href=".concat('https://google.com/search?q=' + search.split(' ').join('+'), " target=#>").concat(result.results[i].name, "</a></li>");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});