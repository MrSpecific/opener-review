// import { useRouter } from 'next/router';
import { gql } from 'graphql-request';
// import { Image, StructuredText } from 'react-datocms';
import { request, responsiveImageFragment, getReviewList, getPaths } from '@data/datocms';
import { Image } from 'react-datocms';
import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';

import Layout from '@components/layout/Layout';
import RichText from '@components/blocks/RichText';
import ImageBlock from '@components/blocks/ImageBlock';
import styles from '@styles/pages/Review.module.css';

export default function SingleRecipe(props) {
  // const { intro } = props;

  return (
    <Layout pageTitle={props.title} className={styles.reviewLayout}>
      <style jsx>{`
        .recipe :global(.ingredient-name) {
          font-weight: bold;
        }
      `}</style>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}

      <section className={styles.reviewTop}>
        <div>
          <Image
            data={props.featuredImage.responsiveImage}
            className={styles.featuredImage}
          ></Image>
        </div>
        <div className="review-intro">{parse(props.intro)}</div>
      </section>

      {props.content && (
        <section className={styles.reviewContent}>
          {props.content.map((block) => {
            const { _modelApiKey } = block;
            let component;

            switch (_modelApiKey) {
              case 'rich_text':
                component = <RichText {...block} />;
                break;
              case 'image_block':
                component = <ImageBlock {...block} />;
                break;
              default:
                component = false;
                break;
            }

            return component;
          })}
        </section>
      )}
      <section className={styles.result}>
        {props.verdict && <div className={styles.verdict}>{props.verdict}</div>}
      </section>
      <div className="attribution">
        {props.date && <div className="date">Filed on {props.date}</div>}
        {props.authors && (
          <div className="authors">
            By&nbsp;
            {props.authors.map((author) => {
              return (
                <Link href={`/author/${author.slug}`} key={author.slug}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>{author.name}</a>
                </Link>
              );
            })}
          </div>
        )}
      </div>
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
        responsiveImage(imgixParams: { fit: crop, w: 1400, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      authors {
        name
        slug
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
            responsiveImage(imgixParams: { fit: crop, w: 1400, h: 800 }) {
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
      verdict
      score
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
