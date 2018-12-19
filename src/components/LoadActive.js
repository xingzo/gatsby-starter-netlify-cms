import React from 'react';
import ReactDOM from 'react-dom';
import SoundcloudPlayer from './SoundcloudPlayer'
import Tracklist from './Tracklist'
import { Link } from 'gatsby'

const LoadActive = (song) => {

  const imageSource= song.active.frontmatter.image
  const trackID = song.active.frontmatter.soundcloudTrackID
  const tracklist = song.active.frontmatter.tracklist
  const slug = song.active.fields.slug

    return (
      <div className="column is-two-thirds">
        <div className="columns">
          <div className="column is-two-thirds"> Preview <SoundcloudPlayer trackID={trackID}/>
          <Link className="button is-primary is-large" to={slug}>
            <span><strong>Download Now</strong></span></Link></div>
          <div className="column"> artwork  <img src ={imageSource}></img></div>
        </div>
        <div className="column"> <Tracklist tracklist={tracklist} /> </div>
      </div>
    );
  }

export default LoadActive;
