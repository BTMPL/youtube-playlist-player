This project aims to improve on some of YouTube Playlist playback support:

- you can load a playlist and it will be stored in localStorage
- you can shuffle the list at any time
- the player is hidden and set to medium quality to lower CPU usage

This is also a "ReactJS learning" project, not really meant for general public.

If you wish to use the app, please generate your unique YouTube API key, thanks :)

*ROADMAP*

- clean up object structure 
	+ read about implementing json schema
- Player should receive the video object from store, not reuest it with IIEF
- implement react-router@4
	+ /video/:videoId
	+ /playlist/:playlistId
- implement loaders based on URL