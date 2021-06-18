import classNames from 'classnames';

export default function ButtonLink(props) {
  const buttonClass = classNames({
    hero: true,
    'background-cover': true,
    [styles.hero]: true,
  });

  return <a className={buttonClass}></a>;
}
