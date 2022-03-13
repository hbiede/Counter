import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StrTextStyle, StrViewStyle } from 'Components/ThemeProvider/useStyle';
import { ThemeType } from 'Components/ThemeProvider/DefaultTheme';

type Styles = {
  container: StrViewStyle;
  errorContainer: StrViewStyle;
  errorText: StrTextStyle;
  headerButton: StrTextStyle;
  headerButtonContainer: StrViewStyle;
  headerRow: StrViewStyle;
  invertButton: StrViewStyle;
  invertButtonText: StrTextStyle;
  modalContainer: StrViewStyle;
  textInput: StrTextStyle;
  textInputContainer: StrViewStyle;
  titleText: StrTextStyle;
};

export default (theme: ThemeType): Styles => {
  const { top: marginTop } = useSafeAreaInsets();
  return {
    container: {
      width: '100%',
    },
    modalContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      margin: 0,
      marginTop,
      paddingHorizontal: 15,
    },
    errorContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.error,
      borderRadius: 4,
      marginTop: 20,
      padding: 10,
    },
    errorText: {
      color: theme.colors.errorText,
      fontSize: '16@ms0.2',
      lineHeight: '20@ms0.2',
      textAlign: 'center',
    },
    headerButton: {
      color: theme.colors.primary,
      fontSize: 45,
    },
    headerButtonContainer: {
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 50,
      width: '100%',
    },
    invertButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      marginTop: 20,
      paddingVertical: 16,
    },
    invertButtonText: {
      color: theme.colors.primaryAccent,
      fontSize: 25,
      textAlign: 'center',
    },
    textInput: {
      color: theme.colors.text,
      fontSize: 25,
      textAlign: 'center',
    },
    textInputContainer: {
      borderColor: theme.colors.border,
      borderRadius: 8,
      borderWidth: 1,
      padding: 10,
      width: '100%',
    },
    titleText: {
      color: theme.colors.text,
      fontSize: '30@ms0.2',
      lineHeight: '35@ms0.2',
    },
  };
};
