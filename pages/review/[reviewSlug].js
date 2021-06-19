// import { useRouter } from 'next/router';
import { gql } from 'graphql-request';
// import { Image, StructuredText } from 'react-datocms';
import { request, responsiveImageFragment, getReviewList, getPaths } from '@data/datocms';

import Layout from '@components/layout/Layout';
import styles from '@styles/pages/Review.module.css';

export default function SingleRecipe(props) {
  // const { fields } = props;
  // const router = useRouter();
  // const id = router.query;

  return (
    <Layout pageTitle={props.title} className={styles}>
      <style jsx>{`
        .recipe :global(.ingredient-name) {
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const allReviews = await getReviewList();

  const paths = getPaths(allReviews, 'reviewSlug');

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

const SINGLE_REVIEW_QUERY = gql`
  query Review($slug: String) {
    review(filter: { slug: { eq: $slug } }) {
      title
      date
      slug
      featuredImage {
        responsiveImage(imgixParams: { fit: crop, w: 1400, h: 600 }) {
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

export async function getStaticProps({ params }) {
  const data = await request({
    query: SINGLE_REVIEW_QUERY,
    variables: { slug: params.reviewSlug },
    preview: false,
  });

  return {
    props: data.review,
  };
}
