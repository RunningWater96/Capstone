"use strict";

var button = document.getElementById('btn_submit');
button.addEventListener('click', function loadDoc() {
  var input = document.getElementById('song_search');
  var song = document.getElementById('song_list');
  var artists = document.getElementById('artist_list');
  var relSongs = document.getElementById('related_songs');
  var jsonObj;
  var myHeaders = new Headers();
  var token = 'BQBfKuwj09X3PU9xsJeXpJdPjUXcXrPMgFJID9HPDpvgFYf3CxXCcl0lE1cn7D2W2u0xJel4CzHqkJ5w8OiEqXaGbsm91v_bn5nDtx1qsdMP5CzcJh734GohzI5kJFGJZsJM02z-P6Bxk6DMY4jfWi0WPJJxel57xkNVs_J5l_wtbrE';
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
          artists.innerHTML += "<li id=artist".concat(j, ">").concat(resultB.tracks[j].artists[0].name, "</li>");
          relSongs.innerHTML += "<li id=song".concat(j, ">").concat(resultB.tracks[j].name, "</li>");
        }
      });
      song.innerHTML += "\n        <li id=song".concat(i, ">").concat(resultA.tracks.items[i].name, " By ").concat(resultA.tracks.items[i].artists[0].name, "</li>\n        <br>\n        ");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});
button.addEventListener('click', function moviesReturn() {
  var input = document.getElementById("song_search");
  var out = document.getElementById("movieReturn");
  fetch("https://api.themoviedb.org/3/search/movie?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=".concat(input.value, "&page=1&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result);

    for (var i = 0; i < result.results.length; i++) {
      out.innerHTML += "<li>".concat(result.results[i].original_title, "</li>");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});
button.addEventListener('click', function televisionReturn() {
  var input = document.getElementById("song_search");
  var out = document.getElementById("tvShows");
  fetch("https://api.themoviedb.org/3/search/tv?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=".concat(input.value, "&page=1&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (result) {
    console.log(result);

    for (var i = 0; i < result.results.length; i++) {
      out.innerHTML += "<li>".concat(result.results[i].name, "</li>");
    }
  })["catch"](function (error) {
    return console.log('error', error);
  });
});