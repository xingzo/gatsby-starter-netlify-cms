import React from 'react'
import { Link } from 'gatsby'

class Modal extends React.Component {

  downloadModal = (track) =>{
    const price = track.pricing.price;
    const title = track.title;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">This Download is <strong>${price}</strong> </p>
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <section className="modal-card-body has-text-centered">
          <h1 class="title is-size-5 has-text-weight-bold is-bold-light">Buy <strong>{title}</strong> and get the following :</h1>
          <ul style={{"paddingLeft":"4rem", "textAlign":"left"}}>
            <li> &#x2714; Exclusive Afrobeats intros, remixes, blends, and mash-ups </li>
            <li> &#x2714; Digital DJ-ready MP3s </li>
            <li> &#x2714; Highest bitrate and quality (up to 320 kbps) </li>
            <li> &#x2714; Simple ID3 tags (artist, title, BPM) with no extra advertisements </li>
            <li> &#x2714; Consistent file names and volume levels </li>
            <li> &#x2714; Inserted Serato cue points and pre-built overviews</li>
          </ul>
          <br/>
          {this.props.button()}
          </section>

          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <div></div>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>)
  }

  render (){
    return (
      <div>
        {this.downloadModal(this.props.track)}
      </div>
    )

}
}

export default Modal
