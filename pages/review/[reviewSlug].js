// import { useRouter } from 'next/router';
import { gql } from 'graphql-request';
// import { Image, StructuredText } from 'react-datocms';
import { request, responsiveImageFragment, getReviewList, getPaths } from '@data/datocms';
import { Image } from 'react-datocms';
// import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';

import Layout from '@components/layout/Layout';
import RichText from '@components/RichText';
import styles from '@styles/pages/Review.module.css';

export default function SingleRecipe(props) {
  // const { intro } = props;
  // const router = useRouter();
  // const id = router.query;

  return (
    <Layout pageTitle={props.title} className={styles}>
      <style jsx>{`
        .recipe :global(.ingredient-name) {
          font-weight: bold;
        }
      `}</style>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Image data={props.featuredImage.responsiveImage} className={styles.featuredImage}></Image>
      {parse(props.intro)}

      {props.content && (
        <section className={styles.reviewContent}>
          {props.content.map((block) => {
            const { _modelApiKey } = block;
            let component;

            switch (_modelApiKey) {
              case 'rich_text':
                component = <RichText {...block} />;
                break;
              default:
                component = false;
                break;
            }

            return component;
          })}
        </section>
      )}
      {/* {props.intro && StructuredText(props.intro)} */}
    </Layout>
  );
}

export async function getStaticPaths() {
  const allReviews = await getReviewList();

  const paths = getPaths(allReviews, 'reviewSlug');

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
      intro
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
      content {
        ... on ImageBlockRecord {
          id
          _modelApiKey
          image {
            responsiveImage(imgixParams: { fit: crop, w: 1400, h: 600 }) {
              ...responsiveImageFragment
            }
          }
        }
        ... on RichTextRecord {
          id
          _modelApiKey
          content
        }
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
