/**
 * @format
 */

import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../App';

import 'react-native';

it('renders correctly', () => {
  renderer.create(<App />);
});
