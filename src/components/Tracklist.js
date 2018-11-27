import React from 'react'
import { Link } from 'gatsby'

const Tracklist = (tracklist) => {

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
                {dispenseTracklist(tracklist.tracklist)}
                  <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
                </div>
              </div>
            </div>
          </div> )

}

export default Tracklist
