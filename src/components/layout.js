import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Footer from "./footer"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            fontFamily: `Inconsolata, sans-serif`
          }}
        >
          {title}
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
            fontFamily: `Inconsolata, sans-serif`
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              fontFamily: `Inconsolata, sans-serif`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <Wrapper>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            fontFamily: `Inconsolata, sans-serif`
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
        </div>
        <Footer />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
