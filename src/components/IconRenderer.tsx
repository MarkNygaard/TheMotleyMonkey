import {
  config,
  type IconDefinition,
  type IconProp,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@fortawesome/fontawesome-svg-core/styles.css';

// Font Awesome injects a <style> into <head> at runtime, which breaks hydration
config.autoAddCss = false;

type IconRendererProps = {
  iconData: IconDefinition;
};

export default function IconRenderer({ iconData }: IconRendererProps) {
  return <FontAwesomeIcon icon={iconData as IconProp} />;
}
