import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'gatsby'
import LoadActive from './LoadActive';


class LatestReleases extends React.Component {
  constructor(props) {
    super(props);
    const { music } = this.props

    this.state = {
      activeSlug: music[0].node.fields.slug,
      active: music[0].node
    };
  }

  componentDidMount() {
  }

  handleClick = (song, id) => {
    console.log("we made something active")
    //if its not already active, make it active
    if(song.fields.slug != this.state.activeSlug){
      this.setState({activeSlug: song.fields.slug,
                     active: song})
    }
    // this.setState({ showButton: true });
    // console.log(e)


  }

  loadLatestSongs = (posts) =>{

    return (posts
      .map(({ node: post }) => {
        const title = post.frontmatter.title
        const slug = post.fields.slug
        const date = post.frontmatter.date
        const description = post.frontmatter.description


        //if its active we should highlight it
        if(this.state.activeSlug === slug){
          return(
          <div
            className="content"
            style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
            key={slug}
          >
            <h4>
              <Link className="has-text-primary" to={slug}>
                {title}
              </Link>
            </h4>
            <p><strong>{description}</strong> </p>
            <p>
              <br />
              <Link className="button is-small" to={slug}>
                Keep Reading ACTIVE→
              </Link>
            </p>

          </div>
        )
        }

        return(
        <div
          onClick={() => this.handleClick(post)}
          className="content"
          style={{ border: '1px solid #eaecee', padding: '2em 4em', opacity: '.50' }}
          key={slug}
        >
          <p>
            <Link className="has-text-primary" to={slug}>
              {title}
            </Link>
          </p>
          <p>{description} </p>
          <p>
            <br />
            <Link className="button is-small" to={slug}>
              Keep Reading
            </Link>
          </p>

        </div>
      )


    }) )
  }

  render() {

    const { music } = this.props

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Latest Releases</h1>
          <div className="columns">
            <div className="column is-one-third">{this.loadLatestSongs(music)}</div>
            <LoadActive active={this.state.active} />
          </div>
          </div>
      </section>
    );
   }
  }

export default LatestReleases;
