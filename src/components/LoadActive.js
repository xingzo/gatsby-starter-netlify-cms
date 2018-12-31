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
  const width = "60%"

    return (
      <div className="column is-two-thirds">
      <div className="column">
        <p style={{'position':'relative', 'top':'30px', 'left':'8rem'}}><strong>Preview</strong></p>
          <SoundcloudPlayer className="is-pulled-left" trackID={trackID} width={width} float={true}/>
          <Link className="button is-primary is-large" style={{'position':'relative', 'top':'54px', 'left':'4rem'}} to={slug}>
            <span><strong>Download Now</strong></span></Link>
            <img className="is-pulled-right" style={{'max-width':'44%', 'position':'relative',
    'bottom': '10rem'}}src ={imageSource}></img>
    </div>
        <div className="" style={{'padding-top':'5rem'}}> <Tracklist tracklist={tracklist} /> </div>
      </div>
    );
  }

export default LoadActive;
