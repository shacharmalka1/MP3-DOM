/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    for (let song of player.songs) {
        document.getElementById("song" + song.id).classList.remove("playing")
        if (song.id === songId) {
            document.getElementById("song" + song.id).classList.add("playing")
        }
    }
}
/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
var divAllSongs = document.getElementById("songs")
divAllSongs.addEventListener("click", removeSongs)

function removeSongs(e, songId) {
    if (e.target.classList.contains("remove-song")) {
        var divSong = e.target.parentElement
        divAllSongs.removeChild(divSong)
    }
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [
        createElement("p", title, [], {}),
        createElement("p", album, [], {}),
        createElement("p", artist, [], {}),
        createElement("p", durationFormat(duration), [], {}),
        createElement("img", [], [], { src: coverArt }),
        createElement("button", ["▶️"], ["play-song-button"], {}),
        createElement("button", ["❌"], ["remove-song"], {}),
    ]
    const classes = []
    const attrs = { onclick: `playSong(${id})`, id: "song" + id }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [
        createElement("p", name, [], {}),
        createElement("p", [songs.length], [], {}),
        createElement("p", playlistDuration(id), [], {}),
    ]
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const element = document.createElement(tagName)
    for (let child of children) {
        element.append(child)
    }
    for (let name of classes) {
        element.classList.add(name)
    }
    for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    return element
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

function findPlaylistById(id) {
    //Get a playlist id and return the wanted playlist by his id
    let correctPlaylist
    for (let i = 0; i < player.playlists.length; i++) {
        //run on playlists array
        if (id === player.playlists[i].id) correctPlaylist = player.playlists[i]
    }
    return correctPlaylist
}

function durationFormat(duration) {
    //converting from seconds to mm:ss format
    let minutes = Math.floor(duration / 60)
    let seconds = duration % 60
    if (minutes < 10 && seconds < 10) return "0" + minutes + ":" + "0" + seconds
    else if (minutes < 10) return "0" + minutes + ":" + seconds
    else if (seconds < 10) return minutes + ":" + "0" + seconds
    else return minutes + ":" + seconds
}

function playlistDuration(id) {
    let correctPlaylist = findPlaylistById(id) //correctPlaylist contain the wanted playlist
    let saveSongId = 0,
        sum = 0
    for (let i = 0; i < correctPlaylist.songs.length; i++) {
        //run on the songs array inside this playlist
        saveSongId = correctPlaylist.songs[i]
        for (let j = 0; j < player.songs.length; j++) {
            //run on the songs array
            if (player.songs[j].id === saveSongId) sum += player.songs[j].duration
        }
    }
    return durationFormat(sum)
}

const elemHtml = document.getElementById("songs")
const elemHtml1 = document.getElementById("playlists")

player.playlists.sort((playlistA, playlistB) => playlistA.name.localeCompare(playlistB.name))
player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title))

for (let i = 0; i < player.songs.length; i++) {
    //songs
    elemHtml.append(createSongElement(player.songs[i]))
}

for (let i = 0; i < player.playlists.length; i++) {
    //playlists
    elemHtml1.append(createPlaylistElement(player.playlists[i]))
}
