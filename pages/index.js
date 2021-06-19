import { request, responsiveImageFragment } from '@data/datocms';
import { Image } from 'react-datocms';
import { gql } from 'graphql-request';
import siteInfo from '@data/siteInfo';

import Layout from '@components/layout/Layout';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const { featuredImage } = props?.data?.allReviews[0];
  // console.log(featuredImage);
  return (
    <Layout className={styles.container} pageTitle={siteInfo.tagline}>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <Image data={featuredImage.responsiveImage} className="cardImage"></Image>
    </Layout>
  );
}

const HOMEPAGE_QUERY = gql`
  query HomePage {
    allReviews(first: 1, orderBy: [date_DESC]) {
      id
      date
      oneLiner
      slug
      title
      featuredImage {
        responsiveImage(imgixParams: { w: 1600, h: 600 }) {
          ...responsiveImageFragment
        }
      }
      authors {
        name
      }
      categories {
        title
        slug
      }
    }
  }

  ${responsiveImageFragment}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 1 },
    preview: false,
  });

  return {
    props: { data },
  };
}
