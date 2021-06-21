import { Image } from 'react-datocms';

export default function RichText(props) {
  const { image } = props;

  return <Image data={image} className="image-block"></Image>;
}
