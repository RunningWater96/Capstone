const button = document.getElementById('btn_submit');

button.addEventListener('click', function loadDoc() {
  const input = document.getElementById('song_search');
  const song = document.getElementById('song_list');
  const artists = document.getElementById('artist_list');
  const relSongs = document.getElementById('related_songs')

  var jsonObj;
  var myHeaders = new Headers();
  const token = 'BQBfKuwj09X3PU9xsJeXpJdPjUXcXrPMgFJID9HPDpvgFYf3CxXCcl0lE1cn7D2W2u0xJel4CzHqkJ5w8OiEqXaGbsm91v_bn5nDtx1qsdMP5CzcJh734GohzI5kJFGJZsJM02z-P6Bxk6DMY4jfWi0WPJJxel57xkNVs_J5l_wtbrE';
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`https://api.spotify.com/v1/search?query=${input.value}&type=track&limit=30`, requestOptions)
    .then(responseA => responseA.json())
    .then(resultA => {
      console.log(resultA);
      jsonObj = resultA;
      for (var i = 0; i < jsonObj.tracks.limit; i++) {
        console.log(jsonObj.tracks.items[i]);
        fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${resultA.tracks.items[i].id}&limit=1`, requestOptions)
          .then(responseB => responseB.json())
          .then(resultB => {
            console.log(resultB);
            for (var j = 0; j < resultB.tracks.length; j++) {
              artists.innerHTML += `<li id=artist${j}>${resultB.tracks[j].artists[0].name}</li>`;
              relSongs.innerHTML += `<li id=song${j}>${resultB.tracks[j].name}</li>`;
            }
          });
        song.innerHTML += `
        <li id=song${i}>${resultA.tracks.items[i].name} By ${resultA.tracks.items[i].artists[0].name}</li>
        <br>
        `;
      }
    })
    .catch(error => console.log('error', error));
});

button.addEventListener('click', function moviesReturn() {
  const input = document.getElementById("song_search");
  const out = document.getElementById("movieReturn");
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=${input.value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      for (var i = 0; i < result.results.length; i++) {
        out.innerHTML += `<li>${result.results[i].original_title}</li>`;
      }
    })
    .catch(error => console.log('error', error));
});

button.addEventListener('click', function televisionReturn() {
  const input = document.getElementById("song_search");
  const out = document.getElementById("tvShows");
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=${input.value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      for (var i = 0; i < result.results.length; i++) {
        out.innerHTML += `<li>${result.results[i].name}</li>`;
      }
    })
    .catch(error => console.log('error', error));
});