import {
  primaryFont
} from '../Fonts';

export default function ({
  bubbleMinHeight,
  paddingRegular
}) {
  return {
    ...primaryFont,
    margin: 0,
    minHeight: bubbleMinHeight - paddingRegular * 2,
    padding: paddingRegular,

    '& > :first-child': {
      marginTop: 0
    },

    '& > :last-child': {
      marginBottom: 0
    },

    '&.markdown': {
      '& img': {
        maxWidth: '100%'
      },

      '& pre': {
        overflow: 'hidden'
      }
    }
  };
}
