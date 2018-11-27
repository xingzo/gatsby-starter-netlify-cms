import React from 'react'
import { Link } from 'gatsby'

const SoundcloudPlayer = (trackID) => {

  let songNumber;

  if(typeof trackID === "string"){
    songNumber = trackID.trackID.trim();
  }else{
    songNumber = trackID.trackID.toString();
  }

  const soundcloudSource = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + songNumber + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_artwork=false&show_reposts=false&show_teaser=true"

  return <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={soundcloudSource}></iframe>

}

//code for min player
// <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/535880235&color=%23ff5500&inverse=false&auto_play=false&show_user=true"></iframe>

export default SoundcloudPlayer
