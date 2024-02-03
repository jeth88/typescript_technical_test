const DEFAULT_FONT_COLOUR = '#FAF9F6';

const GRADIENT_STYLE = {
  fill: ['#c65b09', '#fced1e', '#ffffb4', '#fced1e', '#c65b09'],
  fillGradientStops: [0, 0.25, 0.4, 0.65, 1],
};
const TEXT_STYLE = {
  align: 'center',
  anchorX: 0.5,
  fill: DEFAULT_FONT_COLOUR,
  fontWeight: 'bold',
};

const COMMON_HEADER_TEXT_STYLE = {
  ...TEXT_STYLE,
  ...GRADIENT_STYLE,
  fontFamily: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
  fontSize: 60,
};
const COMMON_GAME_TEXT_STYLE = {
  ...TEXT_STYLE,
  fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
  fontSize: 30,
};

export { COMMON_GAME_TEXT_STYLE, COMMON_HEADER_TEXT_STYLE };
