// navigationRef.js
import { createRef } from 'react';

export const navigationRef = createRef();

export const setNavigator = (navigator) => {
  if (navigator) {
    navigationRef.current = navigator;
  }
};
