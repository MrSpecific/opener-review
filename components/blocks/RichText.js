// import Link from 'next/link';
// import { Image } from 'react-datocms';
import parse from 'html-react-parser';
// import classNames from 'classnames';
import styles from '@styles/blocks/RichText.module.css';

export default function RichText(props) {
  const { content } = props;
  // const className = classNames({
  //   hero: true,
  //   [styles.reviewCard]: true,
  //   [styles[`card--${size}`]]: size,
  // });
  // console.log(featuredImage);
  return <div className={styles.richText}>{parse(content)}</div>;
}
