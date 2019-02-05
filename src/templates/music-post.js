import React from 'react'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SoundcloudPlayer from '../components/SoundcloudPlayer'
import Tracklist from '../components/Tracklist'
import PaypalButton from '../components/PaypalButton'
import DownloadModal from '../components/modal/DownloadModal'
import SuccessModal from '../components/modal/SuccessModal'


class MusicPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: true,
      showDownloadModal: false,
      showSuccessModal: false,
    };
  }

  //paypal
  CLIENT = {
    sandbox: process.env.GATSBY_PAYPAL_DEV,
    production: process.env.GATSBY_PAYPAL_DEV,
  };

  ENV = process.env.NODE_ENV === 'production'
    ? 'production'
    : 'sandbox';

  onSuccess = (payment) => {
    console.log('Successful payment!', payment);
    //open modal to enter email
    this.setState({
      showDownloadModal: false,
      showSuccessModal: true,
    })

  }

  onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);

  onCancel = (data) =>
    console.log('Cancelled payment!', data);

  paypalButton = () =>{
    const { data } = this.props
    const { frontmatter: track } = data.markdownRemark

    return (
      <PaypalButton
      client={this.CLIENT}
      env={this.ENV}
      commit={true}
      currency={'USD'}
      total={track.pricing.price}
      onSuccess={this.onSuccess}
      onError={this.onError}
      onCancel={this.onCancel} />
    )
  }

  //soundcloud
  width = "100%";


  //modal
  openDownloadModal = () =>{
    this.setState({
      showDownloadModal: true,
    })
  }

  hideDownloadModal = () =>{
    this.setState({
      showDownloadModal: false,
    })
  }

  hideSuccessModal = () =>{
    this.setState({
      showSuccessModal: false,
    })
  }


  render() {
    console.log('PAYPAL_PROD', process.env.PAYPAL_DEV)
    console.log('GATSBY_PAYPAL_PROD', process.env.GATSBY_PAYPAL_DEV)
    console.log('NODE_ENV', process.env.NODE_ENV)


    const { data } = this.props
    const { frontmatter: track } = data.markdownRemark

    return (
    <Layout>
      <section className="section">
      <Helmet title={`${track.title} | ${track.title}`} />
        {this.state.showDownloadModal && (
          <DownloadModal title={"Download Modal"} onClose={this.hideDownloadModal} track={track} button={this.paypalButton}/>
        )}
        {this.state.showSuccessModal && (
          <SuccessModal title={"Success Modal"} onClose={this.hideSuccessModal} track={track} />
        )}
        <div className="container content">
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {track.title}
        </h1>
          <div className="columns">
            <div className="column is-two-thirds" style={{"padding-right": "2em"}}>
              <SoundcloudPlayer trackID={track.soundcloudTrackID} width={this.width} float={false}/>
              <br/>
              <p><strong>{track.description}</strong></p>
              <br/>
              <Tracklist tracklist={track.tracklist} />
            </div>
            <aside id="sidebar">
              <a id="btn-report-copy" href="javascript:void(0)" className="btn-report-copy" >
                <i className="flaticon-exclamation"></i>
                <span>Copyright complaint</span>
              </a>

              <a className="download-problems" href="javascript:void(0)" id="btn-broken-link">
                <i className="flaticon-bug"></i>
                <span>Download problems?</span>
              </a>

              <div className="download">
                <button id="btn-free-download" className="btn-download btn-download-notext with-join" onClick={this.openDownloadModal}
                  href="https://www.freepik.com/index.php?goto=74&idfoto=3190080" data-url="https://www.freepik.com/index.php?goto=74&idfoto=3190080">
                    <span className="pill">88.60K</span>
                      <span>Free license with attribution</span>
                </button>

                <a id="gr_bookmark_3190080" data-id="3190080" data-fotografo="474714" data-type="1" className="gr_favorite favourite flaticon-heart" href="https://www.freepik.com/login">
                  <span className="pill">765</span>
                </a>

              </div>

              <div className="sidebar-content">
                <img className="user-card" src={track.image} />
                {track.tags && track.tags.length ? (
                  <div style={{ marginTop: `4rem` }}>
                    <h4>Tags</h4>
                    <ul className="taglist">
                      {track.tags.map(tag => (
                        <li key={tag + `tag`}>
                          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
    )
  }
}

export default MusicPost

export const tagPageQuery = graphql`
  query singleMusicPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        soundcloudTrackID
        tracklist
        image
        downloadLink
        pricing {
          premium
          price
        }
      }
    }
  }
`
