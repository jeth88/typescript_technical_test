const DEFAULT_FONT_COLOUR = '#FAF9F6';

const DROP_SHADOW_STYLE = {
  dropShadow: true,
  dropShadowAngle: 90,
  dropShadowBlur: 15,
  dropShadowColor: '#fe9714',
  dropShadowDistance: 0,
  padding: 10,
};
const GRADIENT_STYLE = {
  fill: ['#c65b09', '#fced1e', '#ffffb4', '#fced1e', '#c65b09'],
  fillGradientStops: [0, 0.25, 0.4, 0.65, 1],
};
const STROKE_STYLE = {
  miterLimit: 2,
  stroke: '#000000',
  strokeThickness: 5,
};
const TEXT_STYLE = {
  align: 'center',
  anchorX: 0.5,
  fill: DEFAULT_FONT_COLOUR,
  fontWeight: 'bold',
};

const COMMON_TEXT_STYLE = {
  fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
  fontSize: 30,
  letterSpacing: 1.5,
};
const COMMON_HEADER_TEXT_STYLE = {
  ...STROKE_STYLE,
  ...TEXT_STYLE,
  ...GRADIENT_STYLE,
  fontFamily: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
  fontSize: 60,
};
const COMMON_GAME_TEXT_STYLE = {
  ...COMMON_TEXT_STYLE,
  ...DROP_SHADOW_STYLE,
  ...STROKE_STYLE,
  ...TEXT_STYLE,
};
const MENU_TEXT_STYLE = {
  ...COMMON_TEXT_STYLE,
  ...STROKE_STYLE,
  ...TEXT_STYLE,
};
const RANDOM_TEXT_STYLE = {
  ...COMMON_TEXT_STYLE,
  ...TEXT_STYLE,
  fill: '#000',
};

export {
  COMMON_GAME_TEXT_STYLE,
  COMMON_HEADER_TEXT_STYLE,
  MENU_TEXT_STYLE,
  RANDOM_TEXT_STYLE,
};
