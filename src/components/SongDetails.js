import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SongDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentSongChanged: false
        };

    }

    
    render() {

        // if user has starred the song
        let classList = "";
        if(this.props.song.userStar){
            classList += " yellow"; 
        }

        // console.log(this.props);
        return (
            <div className="song-details">
                <div className="song-details__title">
                    <div>
                        <h1> { this.props.song.title } </h1>
                        <span className="play-btn__mini" onClick={ ()=>{ this.props.playSong(this.props.song.id) } }> &#9658; </span>
                        <span className={ "star" + classList } onClick={ ()=>{ this.props.starSong(this.props.song.id) } }> &#9733; </span>
                    </div>
                    <span className="btn-default"><NavLink to="/">Back</NavLink></span>
                </div>
                <div className="song-details__info">
                    <div className="song-details__art">
                        <img src={ this.props.song.albumCover + "?method=crop&width=290&height=290" } alt="" />
                        <form onSubmit={ (event)=>{ this.props.downloadSong(event, this.props.song.id) } } >
                            <button className="btn-default" type="submit">Download Song</button>
                        </form>
                    </div>
                    <div className="song-details__content">
                        <div> Artist: { this.props.song.artist } </div>
                        <div> Genres: { this.props.song.genres } </div>
                        <div> Uploaded: { this.props.song.uploaded.format('MMMM Do YYYY') } </div>
                        <div> Listens: { this.props.song.listens } </div>
                        <div> Starred: { this.props.song.starred } </div>
                        <div> Comments: { this.props.song.comments } </div>
                        <div> Downloads: { this.props.song.downloads } </div>
                        <div> FMA Artist Site: <a href={ this.props.song.site } target="_blank"> { this.props.song.site } </a></div>
                        <div> Description: { this.props.song.description } </div>
                        <div> Track ID: { this.props.song.id } </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongDetails;