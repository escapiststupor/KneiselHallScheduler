import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from './index';

storiesOf('Tooltip', module)
  .addDecorator(story => (
    <div style={{ textAlign: 'center', margin: '100px auto' }}>{story()}</div>
  ))
  .add('default', () => (
    <Tooltip content="This is a tooltip!">
      <span>Trigger</span>
    </Tooltip>
  ));
