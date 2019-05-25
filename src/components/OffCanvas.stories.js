import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button, OffCanvas } from '.';

const OffCanvasExample = () => {
  const [isOpen, toggleOpen] = useState(false);

  const handleToggle = () => {
    toggleOpen(!isOpen);
  };

  return (
    <Fragment>
      <OffCanvas
        onStart={action('opening')}
        onComplete={action('opened')}
        onReverseStart={action('closing')}
        onReverseComplete={action('closed')}
        open={isOpen}
        onOffCanvasToggle={handleToggle}
        align={select('align', ['left', 'right'], 'left')}
      >
        Test
      </OffCanvas>

      <Button onClick={handleToggle} type="primary">
        Open OffCanvas
      </Button>
    </Fragment>
  );
};

storiesOf('Components|OffCanvas', module).add(
  'Overview',
  () => <OffCanvasExample />,
  {
    propTables: {
      OffCanvas,
    },
  },
);
