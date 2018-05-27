import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SongsList extends Component {

    constructor(props) {
        super(props);

        this.isisis = this.props.playAll;

        this.state = {
            isPlay: false,
            SongId: this.props.songs.id,
            isPlayAll: this.props.playAll
        };

        this.toggleSong = this.toggleSong.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playAll !== this.props.playAll) {
            this.setState({
                isPlayAll: nextProps.playAll,
                isPlay: nextProps.playAll
            });
        }
    }


    toggleSong() {
        if (this.state.isPlay) {
            document.getElementById("currentAudio" + this.state.SongId).pause();
            this.setState({
                isPlay: false
            });
        } else {
            document.getElementById("currentAudio" + this.state.SongId).play();
            this.setState({
                isPlay: true
            });
        }
    }

    render() {
        /*        // console.log(this.props);
                let songListJSX = this.props.songs.map((song)=>{
                    let classList = "";
                    if(this.props.currentSongId === song.id){
                        classList += " song-card__playing"
                    }*/


        let playBtn = '\u25BA';
        if (this.state.isPlay) {
            playBtn = '\u258C\u258C';
        }


        /*        if(this.state.isPlayAll)
                {
                    document.getElementById("currentAudio" + this.state.SongId).play();
                    this.setState({
                        isPlay: true
                    });
                }
                else
                {
                    document.getElementById("currentAudio" + this.state.SongId).stop();
                    this.setState({
                        isPlay: false
                    });
                }*/

        return (

            <div className="player">
                <audio id={"currentAudio" + this.props.songs.id} src={"/audio/" + this.props.songs.source}/>
                <span className="orange-button" onClick={() => {
                    {
                        this.toggleSong(this.props.songs.id)
                    }
                }}> {playBtn}  </span>
                <div

                    className="timer"
                />
                <div className="track-info">
                    <h2 className="track-title">{this.props.songs.title}</h2>
                    <h3 className="track-user">{this.props.songs.artist}</h3>
                </div>
                <div
                    className="progress-container"
                />

            </div>

        );
    }


    /*               <div className={ "song-card" + classList } key={ song.id }>
                       <audio id={"currentAudio" + song.id} src={ "/audio/" + song.source } onDurationChange={ this.setCurrentSongDurati   on } onTimeUpdate={ this.setCurrentSongTime }></audio>
                       <span className="play-btn" onClick={ ()=>{ this.props.btnHandler(song.id) } }> &#9658; </span>
                       <img className="song-card__img" src={ song.albumCover } alt="" />
                       <div className="song-card__title">
                           <Link to={"/" + song.id} onClick={ ()=>{ this.props.linkHandler(song.id) } }>
                               <h2> { song.title } </h2>
                           </Link>
                       </div>
                   </div>
               );
           });*/

    /*        return (
                <div className="playlist">
                    <div className="playlist__title">
                        <h1> Featured Playlist: Funky Beats </h1>
                    </div>
                    <div className="playlist__content">
                        { songListJSX }
                    </div>
                </div>
            )*/

}

export default SongsList;