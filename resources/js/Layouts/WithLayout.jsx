import React from 'react'
import Layout from './Layout'

const withLayout = (Component) => {
  return function PageWithLayout(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}

export default withLayout