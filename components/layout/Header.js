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
      <div className={styles.headerTop}>
        <Link href={'/'}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="siteTitle">{props.title || siteInfo.title}</a>
        </Link>
      </div>
      <div className={styles.headerBottom}>{props.children}</div>
    </header>
  );
};

export default Header;
