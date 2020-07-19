import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  title?: string
  description?: string
  url: string
  article?: boolean
}

const defaultDescription =
  'Collaborate with other developers from all over the world and build awesome Apps together'

export const SEO = ({
  title,
  description = defaultDescription,
  url,
  article = false,
}: Props) => (
  <Helmet
    titleTemplate="%s - LetsCollab"
    title={title}
    defaultTitle="LetsCollab"
    defer={false}
  >
    <meta property="og:url" content={url} />
    <meta name="og:type" content={article ? 'article' : 'website'} />
    {/* react-helmet throws if fragments are used */}
    {title && [
      <meta key="1" name="og:title" content={title} />,
      <meta key="2" name="twitter:title" content={title} />,
    ]}
    {description && [
      <meta key="1" name="description" content={description} />,
      <meta key="2" name="og:description" content={description} />,
      <meta key="3" name="twitter:description" content={description} />,
    ]}
  </Helmet>
)
