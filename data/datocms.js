import { GraphQLClient, gql } from 'graphql-request';

export function request({ query, variables, preview }) {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });

  return client.request(query, variables);
}

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
export const responsiveImageFragment = gql`
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

const REVIEW_LIST_QUERY = gql`
  query ReviewList($limit: IntType) {
    allReviews(first: $limit) {
      title
      slug
    }
  }
`;

export async function getReviewList(options = {}) {
  const { limit } = options;

  const data = await request({
    query: REVIEW_LIST_QUERY,
    // variables: { limit: 10 },
    variables: { limit },
    preview: false,
  });

  return data.allReviews;
}

// Get just the paths from a set of entries
export const getPaths = (entries, identifier = 'slug') => {
  const paths = entries.map((entry) => {
    return {
      params: {
        [identifier]: entry.slug || entry.fields.slug,
      },
    };
  });

  return paths;
};
