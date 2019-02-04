import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'


class TagRoute extends React.Component {
  render() {


    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">All Extended Packs</h1>
            </div>
            <br/>
            <div className="columns is-multiline">
            {posts.map(({ node: post }) => (
                <div
                  className="column is-one-third"
                  style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <Link to={post.fields.slug}>
                    <img style={{'max-width':'150px'}}src={post.frontmatter.image}></img>
                    </Link>
                  </p>

                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}



export default TagRoute

export const tagPageQuery = graphql`
  query MusicPage {
    allMarkdownRemark(
      limit: 1000
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
            image
          }
        }
      }
    }
  }
`
