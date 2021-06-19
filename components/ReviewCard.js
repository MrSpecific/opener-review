import Link from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';
import styles from '@styles/components/ReviewCard.module.css';

export default function ReviewCard(props) {
  const { title, slug, oneLiner, size, featuredImage, HeadingLevel = 'h2' } = props;
  const className = classNames({
    hero: true,
    [styles.reviewCard]: true,
    [styles[`card--${size}`]]: size,
  });
  // console.log(featuredImage);
  return (
    <div className={className}>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <Image data={featuredImage.responsiveImage} className={styles.cardImage}></Image>
      <HeadingLevel>
        <Link href={`/review/${slug}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.cardLink}>{title}</a>
        </Link>
      </HeadingLevel>
      {oneLiner && <div className={styles.oneLiner}>{oneLiner}</div>}
    </div>
  );
}
