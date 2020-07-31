import { StyleSheet } from 'react-native';
import { Metrics, Colors } from 'themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.padding.base,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    paddingLeft: Metrics.padding.medium
  }
});

export default styles;
