export type IconSize = 'xs'
| 'sm'
| 'lg'
| '1x'
| '2x'
| '3x'
| '4x'
| '5x'
| '6x'
| '7x'
| '8x'
| '9x'
| '10x'

export const getStyles = (size: IconSize) => {
  let styles: string[] = []

  if (size) {
    if (size == 'lg') {
      styles.push('font-size: 1.33333em', 'line-height: .75em', 'vertical-align: -.225em');
    } else if (size == 'xs') {
      styles.push('font-size: .75em')
    } else if (size == 'sm') {
      styles.push('font-size: .875em')
    } else {
      styles.push(`font-size: ${size.replace('x', 'em')}`)
    }
  }
  return styles.join('; ')
}