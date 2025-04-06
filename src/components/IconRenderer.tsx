import type {
  IconDefinition,
  IconProp,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IconRendererProps = {
  iconData: IconDefinition;
};

export default function IconRenderer({ iconData }: IconRendererProps) {
  return <FontAwesomeIcon icon={iconData as IconProp} />;
}
