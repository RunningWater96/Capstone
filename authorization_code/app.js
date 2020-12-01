const button = document.getElementById('btn_submit');

button.addEventListener('click', function loadDoc() {
  const input = document.getElementById('song_search');
  const song = document.getElementById('song_list');
  const artists = document.getElementById('artist_list');
  const relSongs = document.getElementById('related_songs');

  song.innerHTML = '<div>Found Songs</div>';
  artists.innerHTML = '<div>Related Artists</div>';
  relSongs.innerHTML = '<div>Related Songs</div>';

  var jsonObj;
  var myHeaders = new Headers();
  const token = 'BQBSkRYqJZQXJoWPztiH_IBW_30Uz-1WQocscpbQwEXSReHzCQ7K-luR_zrjB7gIE4pNpySOtS2JMrVjnmQ2-oOfZHd5vgFTMobJqEOEtvei0KCWwgDx0-u-Zdh8S9QvXepZMpCjQlgiOqyF8jb6gyuYSSXG961fy6F83upQdXBqFOc';
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
              artists.innerHTML += `<li id=artist${j}> <a href=${resultB.tracks[j].artists[0].external_urls.spotify}>${resultB.tracks[j].artists[0].name}</a></li>`;
              relSongs.innerHTML += `<li id=song${j}> <a href=${resultB.tracks[j].album.external_urls.spotify}>${resultB.tracks[j].name}</a></li>`;
            }
          });
        song.innerHTML += `
        <li id=song${i}> <a href=${resultA.tracks.items[i].album.external_urls.spotify}>${resultA.tracks.items[i].name}</a> By ${resultA.tracks.items[i].artists[0].name}</li>
        <br>
        `;
      }
    })
    .catch(error => console.log('error', error));
});

button.addEventListener('click', function moviesReturn() {
  const input = document.getElementById("song_search");
  const out = document.getElementById("movieReturn");

  out.innerHTML = '<div>Found Movies</div>';

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=${input.value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      for (var i = 0; i < result.results.length; i++) {
        var search = result.results[i].original_title;
        out.innerHTML += `<li><a href=${'https://google.com/search?q='+search.split(' ').join('+')} target=#>${result.results[i].original_title}</a></li>`;
      }
    })
    .catch(error => console.log('error', error));
});

button.addEventListener('click', function televisionReturn() {
  const input = document.getElementById("song_search");
  const out = document.getElementById("tvShows");

  out.innerHTML = '<div>Television Shows</div>';

  fetch(`https://api.themoviedb.org/3/search/tv?api_key=71095500c5e35a3dcd1766944d756f9a&language=en-US&query=${input.value}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      for (var i = 0; i < result.results.length; i++) {
        var search = result.results[i].name;
        out.innerHTML += `<li><a href=${'https://google.com/search?q='+search.split(' ').join('+')} target=#>${result.results[i].name}</a></li>`;
      }
    })
    .catch(error => console.log('error', error));
})