export function decideThemeFactory(allowedThemes, defaultTheme = 'default') {
  return props => allowedThemes.find(theme => !!props[theme]) || defaultTheme;
}
