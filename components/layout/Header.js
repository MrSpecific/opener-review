import styles from '@styles/layout/Header.module.css';
import siteInfo from '@data/siteInfo';

import Link from 'next/link';
import classNames from 'classnames';

const Header = (props) => {
  const headerClass = classNames({
    gutter: true,
    [styles.header]: true,
  });

  return (
    <header className={headerClass}>
      <h1 className={styles.title}>
        <Link href={'/'}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{props.title || siteInfo.title}</a>
        </Link>
      </h1>
      {props.children}
    </header>
  );
};

export default Header;
