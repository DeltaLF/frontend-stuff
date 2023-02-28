import OverlayTrigger, {
  OverlayTriggerProps,
} from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { Fragment } from 'react';
import { Placement } from 'react-bootstrap/esm/types';
import './WrappedTooltips.scss';

interface WrappedTooltips {
  content: string;
  children: JSX.Element;
  placement?: Placement;
}

function WrappedTooltips({
  content,
  children,
  placement = 'right',
}: WrappedTooltips) {
  const renderTooltip = (props: Partial<OverlayTriggerProps>) => (
    <Tooltip className="tooltip" {...props}>
      <div>{content}</div>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

export default WrappedTooltips;
