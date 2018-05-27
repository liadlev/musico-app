import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import moment from 'moment';

import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSongChanged: false,
            currentSongDuration: 0,
            currentSongId: 'fmaFNKY-01',
            playingsongs: [],
            currentSongNewPlay: true,
            currentSongPlaying: false,
            isPlayAll: false,
            isPlayAllChild: false,
            currentSongTime: 0,
            keepSongPlaybackSetting: false,
            selectedSongId: 'fmaFNKY-01',
            songs: this.props.songs,
        };

        // Bindings
        this.toggleCurrentSong = this.toggleCurrentSong.bind(this);
        this.playAll = this.playAll.bind(this);
        /*
            this.playAll = this.playAll.bind(this);
        */
    }





    // flag component change to display details of specified song id
    playAll() {
        if(this.state.isPlayAll) {
            for (let i = 0; i < this.props.songs.length; i++) {
                document.getElementById("currentAudio" + this.props.songs[i].id).loop = false;
                document.getElementById("currentAudio" + this.props.songs[i].id).pause();
                document.getElementById("currentAudio" + this.props.songs[i].id).currentTime = 0;
            }
            this.setState({
                isPlayAll: false
            });
        }
        else
        {
            for (let i = 0; i < this.props.songs.length; i++) {
                document.getElementById("currentAudio" + this.props.songs[i].id).loop = true;
                document.getElementById("currentAudio" + this.props.songs[i].id).play();
            }
            this.setState({
                isPlayAll: true
            });
        }
    }

/*            for (let i = 0; i < this.props.songs.length; i++) {
                document.getElementById("currentAudio" + this.props.songs[i].id).play();
            }
            this.setState({
                isPlayAll: true
            })*/



    // toggle play/pause audio settings
    toggleCurrentSong() {
        if (this.state.currentSongPlaying) {
            document.getElementById("currentAudio" + this.state.currentSongId).pause();
            this.setState({
                currentSongPlaying: false,
            });
        } else {
            document.getElementById("currentAudio" + this.state.currentSongId).play();
            this.setState({
                currentSongPlaying: true,
            });
        }
    }

    render() {

        // get data of current song, including current index position in song list array
        let currentSong;
        for (let i = 0; i < this.props.songs.length; i++) {
            if (this.props.songs[i].id === this.state.currentSongId) {
                currentSong = this.props.songs[i];
                currentSong.index = i;
            }
        }

        // get data of next song in song list
        let nextSong;
        if (currentSong.index === this.state.songs.length - 1) {
            nextSong = this.state.songs[0];
        } else {
            nextSong = this.state.songs[currentSong.index + 1];
        }

        // get data of previous song in song list
        let previousSong;
        if (currentSong.index === 0) {
            previousSong = this.props.songs[this.props.songs.length - 1];
        } else {
            previousSong = this.props.songs[currentSong.index - 1];
        }

        // toggle between play/pause button
        let playBtn = "button__play";
        if (this.state.isPlayAll) {
            playBtn = "button__pause";
        }

        // keep playback settings
        let keepPlayBackSetting = true;


        return (
            <div className="App">
                <div className="title-bar">
                    <img className="logo" src="/Cloud.png" alt=""/>
                    <h1> SoundNuage Music Library </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="playlist">
                            <div className="playlist__title">
                                <h1> Featured Playlist: Funky Beats </h1>
                            </div>
                            <div className="playlist__content">
                                {this.props.songs.map((song) => {
                                    return (
                                        <Route exact path="/"
                                               render={() => <SongsList  playAll={this.state.isPlayAll} songs={song}
                                                                        currentSongId={this.state.currentSongId}/>}/>
                                    );
                                })}
                            </div>
                        </div>
                        {/*<Route exact path="/" render={()=><SongsList songs={ this.state.songs } btnHandler={ this.toggleCurrentSong } linkHandler={ this.showSongDetails } currentSongId={ this.state.currentSongId } />}/>
              <Route path="/:songId" render={(props)=><SongDetails song={ this.state.songs.find((song)=>song.id === props.match.params.songId) } playSong={ this.selectCurrentSong }  downloadSong={ this.incrementDownloadCount } starSong={ this.starSong }/>}/>*/}
                    </div>
                    <div className="row">
                        <div className="footer">
                            <div className="media-player">
                                {/*<audio id="currentAudio" src={ "/audio/" + currentSong.source } onDurationChange={ this.setCurrentSongDuration } onTimeUpdate={ this.setCurrentSongTime }></audio>*/}
                                {/*                <div className="media-player__text">
                  <span className="media-player__text--left"> Now playing: { currentSong.title } </span>
                  <span className="media-player__text--right"> { moment( this.state.currentSongTime * 1000 ).format('m:ss') } / { moment( this.state.currentSongDuration * 1000 ).format('m:ss') } </span>
                </div> */}
                                <div className="media-player__controls">
                                    <div className="button__previous" onClick={() => {
                                        this.selectCurrentSong(previousSong.id, keepPlayBackSetting)
                                    }}></div>
                                    <div className={playBtn} onClick={this.playAll}> </div>
                                    <div className="button__next" onClick={() => {
                                        this.selectCurrentSong(nextSong.id, keepPlayBackSetting)
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;