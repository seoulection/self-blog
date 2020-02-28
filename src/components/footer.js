import React from "react"

class Footer extends React.Component {
  render() {
    return (
      <p style={{
        textAlign: `center`,
        margin: `24px`
      }}>
        © {new Date().getFullYear()}, seoulection
      </p>
    )
  }
}

export default Footer
