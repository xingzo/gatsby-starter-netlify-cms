import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const HomePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
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
                    <nav class="intro-buttons">
                      <a class="button is-primary is-large" href="{{ site.data.meta.download }}">
                        <span><strong>Download Now</strong></span></a>
                      <a class="button is-light is-large" href="{{ site.data.meta.documentation }}">
                        <span><span>View</span><strong>docs</strong></span></a>
                    </nav>
                  </div>

                </div>
              </div>
              <div class="column is-video">
                <div id="introVideo" class="intro-video">
                  <div class="intro-shadow"></div>
                    <div class="intro-iframe">
                    <img src = "../img/kenya-tour.jpg"></img>
                    </div>
                    </div>
                    <p class="intro-author">
                    <span>Video by <a href="http://www.vuemastery.com/" target="_blank">Vue Mastery</a></span>
                    </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HomePageTemplate
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
  }
`

          // <PageContent classNameName="content" content={content} />

          // <section className="hero is-medium intro">
          //   <div className="hero-body">
          //     <div className="container">
          //       <div className="intro-columns">
          //         <div className="intro-column is-content">
          //           <div className="intro-content">
          //             <h1 className="title intro-title">
          //               <strong>Bulma</strong> is an open source CSS framework based on <strong>Flexbox</strong> and used by more than <strong>100,000</strong> developers.
          //             </h1>
          //
          //             <div id="ghbtns" className="intro-ghbtns">
          //               <iframe src="https://ghbtns.com/github-btn.html?user=jgthms&repo=bulma&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
          //               <a href="https://www.npmjs.com/package/bulma" target="_blank" rel="nofollow">
          //                 <img src="https://img.shields.io/npm/dm/bulma.svg" />
          //               </a>
          //             </div>
          //
          //             <pre id="npm" className="intro-npm">
          //             <code id="npmCopy" className="intro-npm-copy" data-clipboard-text="{{ npmInstall }}">copy</code></pre>
          //
          //             <nav className="intro-buttons">
          //               <a className="button is-primary is-large" href="{{ site.data.meta.download }}">
          //                 <span>
          //                   <strong>Download</strong>
          //                   <PageContent classNameName="content" content={content} />
          //
          //                 </span>
          //               </a>
          //               <a className="button is-light is-large" href="{{ site.data.meta.documentation }}">
          //                 <span>
          //                   <span>View</span>
          //                   <strong>docs</strong>
          //                 </span>
          //               </a>
          //             </nav>
          //           </div>
          //         </div>
          //
          //         <div className="intro-column is-video">
          //           <div id="introVideo" className="intro-video">
          //             <div className="intro-shadow">youngg</div>
          //             <div className="intro-spinner"></div>
          //             <div className="intro-iframe">
          //               <iframe id="introIframe" src="https://player.vimeo.com/video/237608586?color=00d1b2" width="640" height="338" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          //             </div>
          //           </div>
          //           <p className="intro-author">
          //             <span>Video by <a href="http://www.vuemastery.com/" target="_blank">Vue Mastery</a></span>
          //           </p>
          //         </div>
          //       </div>
          //
          //     </div>
          //   </div>
          // </section>
