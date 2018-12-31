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
            style={{ 'border-left': '2px solid #fe4802', padding: '2rem' }}
            key={slug}
          >
            <h4>
              <Link className="has-text-primary" to={slug}>
                {title}
              </Link>
            </h4>
            <p><strong>{description}</strong> </p>

          </div>
        )
        }

        return(
        <div
          onClick={() => this.handleClick(post)}
          className="content"
          style={{ padding: '2rem 2rem 2rem 2rem', opacity: '.50' }}
          key={slug}
        >
          <p>
            <Link className="has-text-primary" to={slug}>
              {title}
            </Link>
          </p>
          <p>{description} </p>

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
            <LoadActive active={this.state.active} />
            <div className="column is-one-third">{this.loadLatestSongs(music)}</div>
          </div>
          </div>
      </section>
    );
   }
  }

export default LatestReleases;
