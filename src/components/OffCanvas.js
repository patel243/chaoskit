import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll';
import useClickAway from 'react-use/lib/useClickAway';
import ReactDOM from 'react-dom';
import { TimelineMax } from 'gsap/TweenMax';
import { withTheme } from 'emotion-theming';

import { misc } from '../assets/styles/utility';
import Close from './Close';

const StylesOffCanvasVariables = theme => ({
  size: theme.space.large,
});

const OffCanvas = ({
  children,
  className,
  align,
  open,
  onOffCanvasToggle,
  onComplete,
  onReverseComplete,
  onReverseStart,
  onStart,
  panelWidth,
  theme,
  ...opts
}) => {
  const offCanvasRef = useRef();
  const offCanvasPanelRef = useRef();

  const [renderOffCanvas, setRenderOffCanvas] = useState(open);

  const openOffCanvas = () => {
    const $offCanvas = offCanvasRef.current;

    if ($offCanvas && $offCanvas.timeline) $offCanvas.timeline.play();
  };

  const closeOffCanvas = () => {
    const $offCanvas = offCanvasRef.current;

    if ($offCanvas && $offCanvas.timeline) $offCanvas.timeline.reverse();
  };

  const handleOnReverseComplete = () => {
    setRenderOffCanvas(false);
  };

  const attachTimeline = () => {
    const $offCanvas = offCanvasRef.current;
    const $panel = offCanvasPanelRef.current;

    let forward = true;
    let lastTime = 0;

    // Attach timeline to each instance
    $offCanvas.timeline = new TimelineMax({
      paused: !open,
      onStart: () => {
        onStart();
      },
      onUpdate: () => {
        const newTime = $offCanvas.timeline.time();
        if (
          (forward && newTime < lastTime) ||
          (!forward && newTime > lastTime)
        ) {
          forward = !forward;
          if (!forward) {
            onReverseStart();
          }
        }
        lastTime = newTime;
      },
      onComplete: () => {
        // Focus on active offCanvas for screen readers
        $panel.focus();

        onComplete();
      },
      onReverseComplete: () => {
        handleOnReverseComplete();
      },
    });

    $offCanvas.timeline
      .set($offCanvas, {
        display: 'block',
      })
      .to(
        $offCanvas,
        theme.gsap.timing.long,
        {
          css: {
            opacity: 1,
          },
        },
        'offCanvas'
      )
      .to(
        $panel,
        theme.gsap.timing.long,
        {
          css: {
            x: 0,
          },
          ease: theme.gsap.transition.base,
        },
        'offCanvas'
      );
  };

  useEffect(() => {
    if (open) {
      setRenderOffCanvas(true);
    }
  }, [open]);

  useUpdateEffect(() => {
    if (renderOffCanvas) {
      attachTimeline();

      openOffCanvas();
    } else {
      onReverseComplete();
    }
  }, [renderOffCanvas]);

  useUpdateEffect(() => {
    if (!open) {
      closeOffCanvas();
    }
  }, [open]);

  useClickAway(offCanvasPanelRef, () => onOffCanvasToggle());
  useLockBodyScroll(renderOffCanvas);

  if (!renderOffCanvas) return null;

  return ReactDOM.createPortal(
    <div
      css={{
        // 1. GSAP
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: theme.color.dark.overlay,
        zIndex: 10,

        // 1
        opacity: 0,
        display: 'none',
      }}
      className={cx('CK__OffCanvas', className)}
      ref={offCanvasRef}
      {...opts}
    >
      <div
        css={[
          misc.overflow,
          misc.trimChildren,
          {
            // 1. GSAP
            position: 'absolute',
            top: 0,
            [align]: 0,
            zIndex: 5,
            height: '100%',
            width: '100%',
            background: theme.color.light.base,
            padding: StylesOffCanvasVariables(theme).size,
            boxShadow:
              align === 'left'
                ? `7.5px 0 17.5px ${theme.boxShadowColor.xlight}`
                : `-7.5px 0 17.5px ${theme.boxShadowColor.xlight}`,
            // 1
            transform:
              align === 'left' ? 'translateX(-100%)' : 'translateX(100%)',

            [theme.mq.small]: {
              width: panelWidth,
            },
          },
        ]}
        className="CK__OffCanvas__Panel"
        ref={offCanvasPanelRef}
      >
        <Close
          onClick={onOffCanvasToggle}
          css={{
            position: 'absolute',
            top: StylesOffCanvasVariables(theme).size,
            right: StylesOffCanvasVariables(theme).size,
          }}
          className="CK__OffCanvas__Close"
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

OffCanvas.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  open: PropTypes.bool,
  onOffCanvasToggle: PropTypes.func.isRequired,
  /** GSAP callback */
  onComplete: PropTypes.func,
  /** GSAP callback */
  onReverseComplete: PropTypes.func,
  /** GSAP callback */
  onReverseStart: PropTypes.func,
  /** GSAP callback */
  onStart: PropTypes.func,
  panelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.object.isRequired,
};

OffCanvas.defaultProps = {
  onComplete: () => {},
  onReverseComplete: () => {},
  onReverseStart: () => {},
  onStart: () => {},
  panelWidth: 300,
  align: 'left',
};

export default withTheme(OffCanvas);
