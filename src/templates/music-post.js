import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import SoundcloudPlayer from '../components/SoundcloudPlayer'
import Tracklist from '../components/Tracklist'

export const MusicPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  trackID,
  tracklist,
  artwork,
  pricing,
}) => {
  const PostContent = contentComponent || Content
  const width = "100%";

  if(pricing.premium) {
    console.log("we got something:: ", pricing.premium)
    console.log("we got something:: ", pricing.price)


  }

  // const downloadText = premium ? "Free Download" : "Download";
  const downloadText = "Download";

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
      <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
        {title}
      </h1>
        <div className="columns">
          <div className="column is-two-thirds" style={{"padding-right": "2em"}}>
            <SoundcloudPlayer trackID={trackID} width={width} float={false}/>
            <br/>
            <p><strong>{description}</strong></p>
            <br/>
            <Tracklist tracklist={tracklist} />
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
              <a id="btn-free-download" class="btn-download btn-download-notext with-join"
                href="https://www.freepik.com/index.php?goto=74&idfoto=3190080" data-url="https://www.freepik.com/index.php?goto=74&idfoto=3190080">
                  <b>{downloadText}</b>
                  <span class="pill">88.60K</span>
                    <span>Free license with attribution</span>
              </a>

              <a id="gr_bookmark_3190080" data-id="3190080" data-fotografo="474714" data-type="1" className="gr_favorite favourite flaticon-heart" href="https://www.freepik.com/login">
                <span className="pill">765</span>
              </a>

            </div>
            <div className="sidebar-content">
              <img className="user-card" src={artwork} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
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
  )
}

MusicPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  tracklist: PropTypes.string,
  title: PropTypes.string,
  trackID: PropTypes.string,
  artwork: PropTypes.string,
  pricing: PropTypes.shape({
    premium: PropTypes.boolean,
    price: PropTypes.int,
  }),
  helmet: PropTypes.instanceOf(Helmet),
}

const MusicPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MusicPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={<Helmet title={`${post.frontmatter.title} | Music`} />}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        trackID={post.frontmatter.soundcloudTrackID}
        tracklist={post.frontmatter.tracklist}
        artwork={post.frontmatter.image}
        pricing={post.frontmatter.pricing}
      />
    </Layout>
  )
}

MusicPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default MusicPost

export const pageQuery = graphql`
  query MusicPostByID($id: String!) {
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
        pricing {
          premium
          price
        }
      }
    }
  }
`
