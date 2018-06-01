import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import SongsList from './components/SongsList';

class App extends Component {


    constructor(props) {
        super(props);


        this.state = {
            currentSongId: 'fmaFNKY-01',
            isPlayAll: false,
            isSync: false,
            songs: [],
            original: [],
            playlist: this.props.songs,
            selectValue: ""
        };

        // Bindings
        this.playAll = this.playAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sync = this.sync.bind(this);
        this.remove = this.remove.bind(this);
    }


    sync() {
        if (!this.state.isSync) {
            var arr = this.state.songs.slice();
            var originalArr = this.state.songs.slice();
            arr.sort(function (a, b) {
                var durA = document.getElementById("currentAudio" + a.id).duration;
                var durB = document.getElementById("currentAudio" + b.id).duration;
                if (durA < durB) {
                    return -1;
                }
                if (durA > durB) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < arr.length; i++) {
                document.getElementById("span" + this.state.songs[i].id).innerHTML = document.getElementById("span" + arr[arr.length - 1].id).textContent;
            }
            this.setState({
                songs: arr,
                isSync: true,
                original: originalArr
            });
        }
        else {
            var arr = this.state.original.slice();
            this.setState({
                songs: arr,
                isSync: false
            });
        }
        this.playAll();
    }


    playAll() {
        if (this.state.isPlayAll) {
            for (let i = 0; i < this.state.songs.length; i++) {
                document.getElementById("currentAudio" + this.state.songs[i].id).loop = false;
                document.getElementById("currentAudio" + this.state.songs[i].id).pause();
                document.getElementById("currentAudio" + this.state.songs[i].id).currentTime = 0;
            }
            this.setState({
                isPlayAll: false
            });
        }
        else {
            for (let i = 0; i < this.state.songs.length; i++) {
                document.getElementById("currentAudio" + this.state.songs[i].id).loop = true;
                document.getElementById("currentAudio" + this.state.songs[i].id).play();
            }
            this.setState({
                isPlayAll: true
            });
        }
    }



    handleChange(event)
    {
        this.setState({selectValue: event.target.value});
    }

    remove(id)
    {
        var tempSongs = this.state.songs.slice();
        var tempPlaylist = this.state.playlist.slice();
        var elementPos = tempSongs.map(function (x) {
            return x.id;
        }).indexOf(id);
        var obj = tempSongs[elementPos];
        tempPlaylist.push(obj);
        tempSongs.splice(elementPos, 1);
        this.setState({
            playlist: tempPlaylist,
            songs: tempSongs
        });
    }

    handleSubmit(event) {
        if(event.target.value !== "") {
            var tempPlaylist = this.state.playlist.slice();
            var tempSongs = this.state.songs.slice();
            var elementPos = tempPlaylist.map(function (x) {
                return x.id;
            }).indexOf(this.state.selectValue);
            var obj = tempPlaylist[elementPos];
            tempSongs.push(obj);
            tempPlaylist.splice(elementPos, 1);
            this.setState({
                playlist: tempPlaylist,
                songs: tempSongs
            });
        }
        event.preventDefault();
    }

    render() {
        // toggle between play/pause button
        let playBtn = "button__play";
        if (this.state.isPlayAll) {
            playBtn = "button__pause";
        }

        let playlistList = this.state.playlist;
        let optionItems = playlistList.map((song) =>
            <option value={song.id}>{song.title}</option>
        );


        return (
            <div className="App">
                <div className="title-bar">
                    <h1> Musico - Looper </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="playlist">
                            <div className="playlist__title">
                                <h1> Featured Playlist List: </h1>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <select onChange={this.handleChange}>
                                            <option value="">choose a song</option>
                                            {optionItems}
                                        </select>
                                    </label>
                                    <input type="submit" value="Add to Playlist"/>
                                </form>
                            </div>
                        </div>
                        <div className="playlist__content">
                            {this.state.songs.map((song) => {
                                return (
                                    <Route exact path="/"
                                           render={() => <SongsList
                                               isSync={this.state.isSync}
                                               removeFunc = {this.remove}
                                               songId={song.id}
                                               playAll={this.state.isPlayAll} songs={song}
                                           />}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="footer">
                        <div className="media-player">
                            <div className="media-player__controls">
                                <div className={playBtn} onClick={this.playAll}></div>
                                <div id="sync" className="line" onClick={this.sync}>sync</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;