import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import LatestReleases from '../components/LatestReleases'

export const HomePageTemplate = ({ title, content, contentComponent, music }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
    <section className="hero is-medium intro">
      <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-content">
                <div className="intro-content">
                  <h1 className="title intro-title">
                  <strong>Afro-Extended</strong> is an open source CSS framework based on <strong>Flexbox</strong> and used by more than <strong>100,000</strong> developers.
                  </h1>
                  <p> Dj Shinski dropped a free kit containing midi and loop samples suitable for trap, hip-hop, future r&b and beyond. </p>
                  <div className="music-player"><iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/421343235&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                  </div>
                  <div>
                    <nav className="intro-buttons">
                      <a className="button is-primary is-large" href="{{ site.data.meta.download }}">
                        <span><strong>Download Now</strong></span></a>
                      <a className="button is-light is-large" href="{{ site.data.meta.documentation }}">
                        <span><span>View</span><strong>docs</strong></span></a>
                    </nav>
                  </div>

                </div>
              </div>
              <div className="column is-video">
                <div id="introVideo" className="intro-video">
                  <div className="intro-shadow"></div>
                    <div className="intro-iframe">
                    <img src = "../img/kenya-tour.jpg"></img>
                    </div>
                    </div>
                    <p className="intro-author">
                    <span>Video by <a href="http://www.vuemastery.com/" target="_blank">Vue Mastery</a></span>
                    </p>
              </div>
            </div>
          </div>
      </div>
    </section>
    <LatestReleases music={music}/>
  </div>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,

}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data
  const { edges: music } = data.allMarkdownRemark


  return (
    <Layout>
      <HomePageTemplate
        music={music}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const PageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "music-post" } }}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            downloadLink
            tracklist
            image
            preview
            description
            soundcloudTrackID
          }
        }
      }
    }
  }
`
