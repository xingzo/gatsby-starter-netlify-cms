import React from 'react'
import { Link } from 'gatsby'

class Tracklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: true,
    };
  }

  dispenseTracklist = (tracklistStr) => {
    let trackListArr = tracklistStr.split("\n");
    console.log(trackListArr)

    const list = trackListArr.map((track) => {
      if(track.length > 0){
        return <li>{track}</li>
      }
    })
    return <ul>{list}</ul>
  }

  openDropdown = (e) => {
    if(this.state.showDropdown === false){
      this.setState({ showDropdown: true });
    }else{
      this.setState({ showDropdown: false });
    }
    console.log(this.state.showDropdown);

  }

render (){
  const dropdownClass = this.state.showDropdown ? "dropdown is-active" : "dropdown";

  return <div className={dropdownClass} style={{"display":"block"}}>
    <div className="dropdown-trigger" onClick={() => this.openDropdown() } style={{"text-align":"center"}}>
    <hr/>
      <button className="button" astyle={{"border-radius":"0", 'box-shadow': 'none'}}ria-haspopup="true" aria-controls="dropdown-menu3" >
        <span>Tracklist</span>
      </button>
    <hr/>
    </div>
    <div className="dropdown-menu" id="dropdown-menu3" role="menu" >
      <div className="dropdown-content" style={{"border-radius":"0", 'box-shadow': 'none'}}>
        <div className="dropdown-item">
          {this.dispenseTracklist(this.props.tracklist)}
          <p>You can insert <strong>any type of content</strong> within the drmenu.</p>
        </div>
      </div>
    </div>
  </div>
}
}

export default Tracklist
