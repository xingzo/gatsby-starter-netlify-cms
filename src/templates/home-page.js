import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import SoundcloudPlayer from '../components/SoundcloudPlayer'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import LatestReleases from '../components/LatestReleases'

export const HomePageTemplate = ({ title, content, contentComponent, music }) => {
  const PageContent = contentComponent || Content

  const latestSlug = music[0].node.fields.slug;
  const latestImage = music[0].node.frontmatter.image
  const latestTrackID = music[0].node.frontmatter.soundcloudTrackID
  const width = "100%"

  return (
    <div>
    <section className="hero is-medium intro">
      <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-content">
                <div className="intro-content">
                  <h1 className="title intro-title">
                  <strong>Afro-Extended</strong> is The Only Music Source DJs and Producers Need
                  </h1>
                  <p> Stop searching – the Afro Extended record pool supplies all of the extended versions and remixes of the hottest afro beats you need in one dedicated source </p>
                  <br/>
                  <SoundcloudPlayer className="is-pulled-left" trackID={latestTrackID} width={width} float={false}/>
                  <div className="column">
                    <Link className="button is-primary is-large" to={latestSlug}>
                      <span><strong>Download The Latest Extended Pack</strong></span></Link>
                  </div>

                </div>
              </div>
              <div className="column is-video">
                <div id="introVideo" className="intro-video">
                  <div className="intro-shadow"></div>
                    <div className="intro-iframe">
                    <img src = {latestImage}></img>
                    </div>
                    </div>
                    <p className="intro-author">
                    <span>Website by <a href="https://xingzo.github.io" target="_blank">Kingsley Nyaosi</a></span>
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
      limit: 5
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
