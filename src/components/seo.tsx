/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react';
import { Helmet, MetaProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteMetaQuery } from '../../types/gatsby-graphql';

type Props = {
  title: string
  lang?: string
  description?: string
  meta?: MetaProps[]
}
const SEO: FC<Props> = ({ description = '', lang = 'en', meta = [], title }) => {
  const { site } = useStaticQuery<SiteMetaQuery>(
    graphql`
      query SiteMeta {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description ?? site!.siteMetadata!.description;

  const metas: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site?.siteMetadata?.author || '',
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
      meta={metas.concat(meta)}
    />
  );
}

export default SEO;
