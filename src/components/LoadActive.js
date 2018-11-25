import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'gatsby'
import SoundcloudPlayer from './SoundcloudPlayer'

const LoadActive = (song) => {
  // for soundcloud we only need the song number and not the whole embed code so we should update the preview
  let imageSource= song.active.frontmatter.image
  let preview = song.active.frontmatter.preview
  let trackID = song.active.frontmatter.soundcloudTrackID

  // console.log(preview)
  // const songNumber = "519868764";
  // const soundcloudSource = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + songNumber + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
  //
  // const displayPreview = () =>{
  //         return <div>{preview}</div>;
  //       // return <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={soundcloudSource}></iframe>;
  // }

  const createMarkup = () => {
    return {__html: preview};
  }

  //TODO: we should move to this to its own separate component
  const soundcloudPlayer = () => {
    //using dangerouslySetInnerHTML to render the iFrame element as HTML instead of text
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }



  const tracklist = () => {

    const dispenseTracklist = (tracklistStr) => {

      let trackListArr = tracklistStr.split("\n");
      console.log(trackListArr)

      const list = trackListArr.map((track) => {
        if(track.length > 0){
          return <li>{track}</li>
        }
      })

      return <ul>{list}</ul>

    }

    return (<div className="dropdown is-active" style={{"display":"block"}}>
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>Tracklist</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{"position":"relative"}}>
                <div className="dropdown-content">
                  <div className="dropdown-item">
                  {dispenseTracklist(song.active.frontmatter.tracklist)}
                    <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
                  </div>
                </div>
              </div>
            </div> )

  }

    return (
      <div className="column is-two-thirds">
        <div className="columns">
          <div className="column is-two-thirds"> Preview <SoundcloudPlayer trackID={trackID}/> <a className="button is-primary is-large" href="{{ site.data.meta.download }}">
            <span><strong>Download Now</strong></span></a></div>
          <div className="column"> artwork  <img src ={imageSource}></img></div>
        </div>
        <div className="column"> {tracklist()} </div>
      </div>
    );
  }

export default LoadActive;
