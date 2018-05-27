import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';

import App from './App';
import './index.css';

// function Song(source, title, description, id) {
//   this.source = source;
//   this.title = title;
//   this.description = description;
//   this.id = id;
// }

function Track(source, title, artist, genres, uploaded, listens, starred, comments, downloads, site, description, albumCover, id){
  this.source = source;
  this.title = title;
  this.artist = artist;
  this.genres = genres;
  this.uploaded = uploaded;
  this.listens = listens;
  this.starred = starred;
  this.comments = comments;
  this.downloads = downloads;
  this.site = site;
  this.description = description;
  this.albumCover = albumCover;
  this.id = id;
}

// const songs = [
//   new Song('/audio/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', '0'),
//   new Song('/audio/olympian.mp3', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm', '1'),
//   new Song('/audio/transmission.mp3', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', '2')
// ];

const tracksFunky = [
  new Track('Eggs_Over_Easy_-_05_-_Im_Funky_But_Im_Clean.mp3', "I'm Funky But I'm Clean", 'Eggs Over Easy', 'Country, Rock', moment('2017-01-24'), 6066, 4, 0, 832, 'http://freemusicarchive.org/music/Eggs_Over_Easy/', '', 'https://freemusicarchive.org/file/images/albums/Eggs_Over_Easy_-_Live_at_WFMU_for_Surface_Noise_with_Joe_McGasko_662016_-_20170124175549905.png', 'fmaFNKY-01'),
  new Track('Jason_Shaw_-_FUNKY_JUNKY.mp3', 'Funky Junky', 'Jason Shaw', 'Country, Folk', moment('2011-08-17'), 30039, 67, 4, 24921, 'http://freemusicarchive.org/music/Jason_Shaw/', '', 'https://freemusicarchive.org/file/images/albums/Jason_Shaw_-_Audionautix_Acoustic_-_20110817152444364.jpg', 'fmaFNKY-02'),
  new Track('Ivan_Julian_-_04_-_Funky_Beat_In_Siamese.mp3', 'Funky Beat In Siamese', 'Ivan Julian', 'Rock, Punk, Post-Punk', moment('2011-08-15'), 847, 1, 0, 280, 'http://freemusicarchive.org/music/Ivan_Julian/', '', 'https://freemusicarchive.org/file/images/albums/Ivan_Julian_-_Live_at_WFMU_on_The_Cherry_Blossom_Clinic_With_Terre_T_on_August_13_2011_-_20110815131318083.jpg', 'fmaFNKY-03'),
  new Track('Chapelle_59_-_11_-_Funky_Beats.mp3', 'Funky Beats', 'Chapelle 59', 'Rock, Improv', moment('2011-07-05'), 1658, 0, 0, 832, 'http://freemusicarchive.org/music/Chapelle_59/', '', 'https://freemusicarchive.org/file/images/tracks/Track_-_2011070544419424', 'fmaFNKY-04'),
  new Track('Lee_Rosevere_-_12_-_The_Funky_Hump.mp3', 'The Funky Hump', 'Lee Rosevere', 'Rock, Electronic, Soundtrack', moment('2010-06-09'), 7035, 9, 0, 6201, 'http://freemusicarchive.org/music/Lee_Rosevere/', '', 'https://freemusicarchive.org/file/images/albums/Lee_Rosevere_-_BAM_-_20100609133150353.jpg', 'fmaFNKY-05'),
];

ReactDOM.render((
  <Router>
    <App songs={tracksFunky} />
  </Router>
),document.getElementById('root'));
