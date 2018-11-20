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
    // active = posts[i].fields.slug

    return (posts
      .map(({ node: post }) => {
        if(this.state.activeSlug === post.fields.slug){
          return(
          <div
            className="content"
            style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
            key={post.id}
          >
            <p>
              <Link className="has-text-primary" to={post.fields.slug}>
                {post.frontmatter.title}
              </Link>
              <span> &bull; </span>
              <small>{post.frontmatter.date}</small>
            </p>
            <p>
              {post.excerpt}
              <br />
              <br />
              <Link className="button is-small" to={post.fields.slug}>
                Keep Reading ACTIVE→
              </Link>
            </p>
            <p>stupid </p>
          </div>
        )
        }

        return(
        <div
          onClick={() => this.handleClick(post)}
          className="content"
          style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
          key={post.id}
        >
          <p>
            <Link className="has-text-primary" to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
            <span> &bull; </span>
            <small>{post.frontmatter.date}</small>
          </p>
          <p>
            {post.excerpt}
            <br />
            <br />
            <Link className="button is-small" to={post.fields.slug}>
              Keep Reading →
            </Link>
          </p>
          <p>stupid </p>
        </div>
      )}) )
  }

  loadActive = () => {




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
