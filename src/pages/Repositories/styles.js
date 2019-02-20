import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },

  form: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    padding: metrics.basePadding,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  formInput: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    color: colors.darker,
    flex: 1,
    fontSize: 14,
    marginRight: metrics.baseMargin,
    padding: metrics.basePadding / 2,
  },

  formIcon: {
    color: colors.dark,
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
    textAlign: 'center',
  },
});

export default styles;
