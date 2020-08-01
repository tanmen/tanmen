import { graphql, useStaticQuery } from "gatsby";
import React, { FC, useMemo } from "react";
import { Helmet } from "react-helmet";
import { DeepNonNullable } from "utility-types";
import { SiteMetaQuery } from "../../types/gatsby-graphql";

type MetaProps = JSX.IntrinsicElements["meta"];
type Props = {
  title?: string
  lang?: string
  description?: string
  meta?: MetaProps[]
}
const SEO: FC<Props> = ({ description = "", lang = "ja", meta = [], title }) => {
  const { site: { siteMetadata } } = useStaticQuery<DeepNonNullable<SiteMetaQuery>>(graphql`
    query SiteMeta {
      site {
        siteMetadata {
          title
          author
          description
          social {
            twitter
            github
            qiita
          }
        }
      }
    }
  `);

  const metaTitle = useMemo(() => title ?? siteMetadata.title, [title, siteMetadata.title]);
  const metaDescription = useMemo(() => description ?? siteMetadata.description,
    [description, siteMetadata.description]);

  const metas: MetaProps[] = useMemo(() => [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: metaTitle
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: siteMetadata.social.twitter
    },
    {
      name: `twitter:title`,
      content: metaTitle
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ], [metaTitle, metaDescription, siteMetadata]);
  return <Helmet
    htmlAttributes={{ lang }}
    title={title ?? siteMetadata.title}
    titleTemplate={title ? `%s | ${siteMetadata.title}` : `%s`}
    meta={metas.concat(meta)}
  />;
};

export default SEO;
