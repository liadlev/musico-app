import React, {Component} from 'react';
import detect from 'bpm-detective';


class SongsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
            isPlayAll: this.props.playAll,
            sync: this.props.isSync,
            SongId: this.props.songId,
            songs: this.props.song
        };

        this.toggleSong = this.toggleSong.bind(this);
        this.bpmCalculator = this.bpmCalculator.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.removeSong = this.removeSong.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playAll !== this.props.playAll) {
            this.setState({
                isPlayAll: nextProps.playAll,
                isPlay: nextProps.playAll
            });
        }
        if (nextProps.isSync !== this.props.isSync) {
            this.setState({
                sync: nextProps.isSync
            });
        }
    }

    bpmCalculator(songSrc) {
        const AudioContext = window.AudioContext;
        const locSrc = '/audio/';
        const src = locSrc + songSrc;
        let context = new AudioContext();
        let tempBpm = "";

        // Fetch some audio file
        fetch(src)
        // Get response as ArrayBuffer
            .then(response => response.arrayBuffer())
            .then(buffer => {
                // Decode audio into an AudioBuffer
                return new Promise((resolve, reject) => {
                    context.decodeAudioData(buffer, resolve, reject);
                });
            })
            // Run detection
            .then(buffer => {
                    try {
                        tempBpm  = detect(buffer);
                        if(!this.state.sync)
                            document.getElementById("span" + this.props.songs.id).innerHTML = tempBpm;


                    } catch (err) {
                        console.error(err);
                    }
                }
            );
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

    removeSong(){
        this.props.removeFunc(this.props.songs.id)
    }

    render() {
        let playBtn = '\u25BA';
        if (this.state.isPlay) {
            playBtn = '\u258C\u258C';
        }
        return (

            <div className="player">
                <audio id={"currentAudio" + this.props.songs.id} src={"/audio/" + this.props.songs.source}/>
                <span className="orange-button" onClick={() => {
                    {
                        this.toggleSong(this.props.songs.id)
                    }
                }}> {playBtn}  </span>
                <img className="remove" src="/remove.jpg" alt="" onClick=
                    {
                        this.removeSong
                    }
                />
                <div className="track-info">
                    <h2 className="track-title">{this.props.songs.title}</h2>
                    <h3 className="track-user">{this.props.songs.artist}</h3>
                    <h3>bpm: <span id={"span" + this.props.songs.id}>{this.bpmCalculator(this.props.songs.source)}</span></h3>

                </div>


            </div>

        );
    }




}

export default SongsList;