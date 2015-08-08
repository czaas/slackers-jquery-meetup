$(document).ready(function(){
	var songArray = [{
		songTitle: 'Enter Sandman',
		artist: 'Metallica',
		album: 'Enter Sandbox'
	}, {
		songTitle: 'Crazy Train',
		artist: 'Ozzy',
		album: 'Wizzard of Oz'
	}, {
		songTitle: 'Superman',
		artist: 'Goldfinger',
		album: 'Hang-ups'
	},{
		songTitle: 'Black Me Out',
		artist: 'Against Me!',
		album: 'Transgender Dysphoria Blues'
	},{
		songTitle: 'Fall Back Down',
		artist: 'Rancid',
		album: 'Indestructable'
	}];

	var position = 0;
	var shuffleMode = false;
	var shuffledSongArray = shuffle(songArray.slice(0));

	// listeners
	$('#play').on('click', function(){
		playSong();
	});

	$('#next').on('click', function(){
		if(position >= (songArray.length - 1)){
			position = 0;
			playSong();
		} else {
			position++;	
			playSong();
		}
	});

	$('#last').on('click', function(){
		if(position === 0){
			position = songArray.length - 1;
			playSong();
		} else {
			position--;	
			playSong();
		}
	});

	$('#shuffle').on('click', function(){

		$(this).toggleClass('btn-success');

		if($(this).text() === 'Shuffle Play Off'){
			shuffleMode = true;
			position = 0;
			$(this).text('Shuffle Play On');
			shuffledSongArray = shuffle(songArray.slice(0));
			playSong();
		} else {
			shuffleMode = false;
			position = 0;
			$(this).text('Shuffle Play Off');
			playSong();
		}
	});

	$('#addbtn').on('click', function(){
		var songName = $('#title').val();
		var artistName = $('#artist').val();
		var albumName = $('#album').val();

		addSong(songName, artistName, albumName);
		storage();

		$('#title').val('');
		$('#artist').val('');
		$('#album').val('');
	});

	// functions
	function template(obj){
		return '<h2>' + obj.songTitle + '</h2>' + 
			'<h3>' + obj.artist + '</h3>' +
			'<h3>' + obj.album + '</h3>';
	}

	function playSong(){
		if(shuffleMode === true){
			$('#screen').html(template(shuffledSongArray[position]));
		} else {
			$('#screen').html(template(songArray[position]));
		}
	}

	function shuffle(array) {
	  var copy = [], n = array.length, i;

	  // While there remain elements to shuffle…
	  while (n) {

	    // Pick a remaining element…
	    i = Math.floor(Math.random() * n--);

	    // And move it to the new array.
	    copy.push(array.splice(i, 1)[0]);
	  }

	  return copy;
	}

	function addSong(songTitleName, artistName, albumName){
		var song = { 
			songTitle: songTitleName,
			artist: artistName,
			album: albumName
		};
		songArray.push(song);
		updateStorage();
	}

	function updateStorage(){
		localStorage.setItem('Song-Array', JSON.stringify(songArray));
	}

	function storage(){

		var songArrayExists = localStorage.getItem('Song-Array');

		if(songArrayExists === null){
			localStorage.setItem('Song-Array', JSON.stringify(songArray));
		} else {
			songArray = JSON.parse(songArrayExists);
		}

		localStorage.setItem('Song-Array', JSON.stringify(songArray));
	}

	storage();

});