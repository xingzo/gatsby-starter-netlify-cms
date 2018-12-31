import React from 'react'
import { Link } from 'gatsby'

const SoundcloudPlayer = (props) => {

  let songNumber = props.trackID.trim();

  const soundcloudSource = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + songNumber + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_artwork=false&show_reposts=false&show_teaser=true"

  if(props.float === true){
      return <div style={{'z-index': '69', 'position': 'relative', 'top': '44px'}} ><iframe width={props.width} height="124" scrolling="no" frameBorder="no" allow="autoplay" src={soundcloudSource}></iframe></div>
  }
  else{
      return <div><iframe width={props.width} height="124" scrolling="no" frameBorder="no" allow="autoplay" src={soundcloudSource}></iframe></div>
  }



}

//code for min player
// <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/535880235&color=%23ff5500&inverse=false&auto_play=false&show_user=true"></iframe>

export default SoundcloudPlayer
