import { BaseTheme } from './types'

const textColor = '#333'
const deemedTextColor = '#999'
const inverseTextColor = '#FFF'
const backgroundColor = '#FFF'
const alternativeBackgroundColor = '#F8F8F8'
const activeColor = '#63AEFC'
const borderColor = '#E5E5E5'

const base1Color = '#2c2d30'
const base2Color = '#1e2022'
const primaryColor = '#03C588'
const dark87Color = 'rgba(0,0,0,0.87)'
const dark54Color = 'rgba(0,0,0,0.54)'
const dark26Color = 'rgba(0,0,0,0.26)'
// const dark12Color = 'rgba(0,0,0,0.12'
const dark100Color = '#000'

export const defaultTheme: BaseTheme = {
  colors: {
    text: textColor,
    deemedText: deemedTextColor,
    inverseText: inverseTextColor,
    background: backgroundColor,
    alternativeBackground: alternativeBackgroundColor,
    active: activeColor,
    border: borderColor
  },
  fontSize: 15,
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Fira sans', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,

  // General
  textColor: dark100Color,
  uiTextColor: dark87Color,
  activeUiTextColor: dark100Color,
  disabledUiTextColor: dark54Color,

  primaryColor: primaryColor,
  borderColor: dark26Color,
  iconColor: dark54Color,
  activeIconColor: dark87Color,
  backgroundColor: base1Color,
  secondaryBackgroundColor: base2Color,
  activeBackgroundColor: base2Color,
  shadow: '0 2px 24px rgba(0,0,0,0.5)',

  scrollBarTrackColor: base2Color,
  scrollBarThumbColor: dark26Color,

  // SideBar
  sideBarBackgroundColor: base1Color,
  sideBarTextColor: dark87Color,
  sideBarSecondaryTextColor: dark54Color,

  // Button
  primaryButtonLabelColor: dark100Color,
  primaryButtonBackgroundColor: primaryColor,
  secondaryButtonLabelColor: dark100Color,
  secondaryButtonBackgroundColor: 'transparent',

  // Input
  inputBackground: dark26Color
}
