import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PaypalButton from '../components/PaypalButton'

const CLIENT = {
  sandbox: 'AbgJ_48VxIvYAhXew2i60muEHKQFze829S3doqMQeGsc76fV3mPUoXzWf4Io9HjVpRS03F8E_Z8Q6kbx',
  production: 'AbgJ_48VxIvYAhXew2i60muEHKQFze829S3doqMQeGsc76fV3mPUoXzWf4Io9HjVpRS03F8E_Z8Q6kbx',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class TagRoute extends React.Component {
  render() {
    const onSuccess = (payment) =>
  console.log('Successful payment!', payment);

const onError = (error) =>
  console.log('Erroneous payment OR failed to load script!', error);

const onCancel = (data) =>
  console.log('Cancelled payment!', data);

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            {posts
              .map(({ node: post }) => (
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
                      Keep Reading →
                    </Link>
                  </p>
                  <PaypalButton
                  client={CLIENT}
                  env={ENV}
                  commit={true}
                  currency={'USD'}
                  total={100}
                  onSuccess={onSuccess}
                  onError={onError}
                  onCancel={onCancel} />
                  <p>stupid </p>
                </div>
              ))}
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
          }
        }
      }
    }
  }
`
