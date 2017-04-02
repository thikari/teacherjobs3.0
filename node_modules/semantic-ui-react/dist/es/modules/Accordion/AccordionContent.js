import _extends from 'babel-runtime/helpers/extends';
import React, { PropTypes } from 'react';
import cx from 'classnames';

import { customPropTypes, getElementType, getUnhandledProps, META, useKeyOnly } from '../../lib';

function AccordionContent(props) {
  var active = props.active,
      children = props.children,
      className = props.className;

  var classes = cx('content', useKeyOnly(active, 'active'), className);
  var rest = getUnhandledProps(AccordionContent, props);
  var ElementType = getElementType(AccordionContent, props);

  return React.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    children
  );
}

AccordionContent.handledProps = ['active', 'as', 'children', 'className'];
AccordionContent.displayName = 'AccordionContent';

process.env.NODE_ENV !== "production" ? AccordionContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Whether or not the content is visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
} : void 0;

AccordionContent._meta = {
  name: 'AccordionContent',
  type: META.TYPES.MODULE,
  parent: 'Accordion'
};

export default AccordionContent;