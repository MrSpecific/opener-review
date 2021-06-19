import classNames from 'classnames';
import styles from '@styles/components/ButtonLink.module.css';

export default function ButtonLink(props) {
  const { label, href } = props;
  const buttonClass = classNames({
    [styles.buttonLink]: true,
  });

  return (
    <a className={buttonClass} href={href}>
      {label}
    </a>
  );
}
