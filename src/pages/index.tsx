import { graphql } from "gatsby"
import React, { FC } from "react"
import { IndexTemplate } from "../components/templates/indexTemplate"

const RootPage: FC = () => <IndexTemplate/>

export default RootPage

const query = graphql`query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
        childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
            }
        }
    }
}`

