import { hideVisually, fluidRange } from 'polished';

export const trimChildren = {
  '*': {
    '&:last-child': {
      marginBottom: '0 !important',
    },

    '> *': {
      '&:last-child': {
        marginBottom: '0 !important',
      },
    },
  },
};

export const spaceChildren = ({
  theme = {},
  property = 'marginLeft',
  size = theme.space.base,
}) => ({
  '> * + *': {
    [property]: `${size}px !important`,
  },
});

export const overflow = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
};

export const hide = {
  ...hideVisually(),
};

export const absoluteCenter = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

export const fluidSize = ({
  theme = {},
  property = 'padding',
  from = 0,
  to = 0,
  breakpointFrom = 'small',
  breakpointTo = 'medium',
}) => fluidRange(
  {
    prop: property,
    fromSize: `${from}px`,
    toSize: `${to}px`,
  },
  `${theme.breakpoint[breakpointFrom]}px`,
  `${theme.breakpoint[breakpointTo]}px`,
);
