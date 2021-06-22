import RichText from '@components/blocks/RichText';
import ImageBlock from '@components/blocks/ImageBlock';

export default function Blocks(props) {
  const { content } = props;
  return (
    <section className="blocks-section">
      {content &&
        content.map((block) => {
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
  );
}
