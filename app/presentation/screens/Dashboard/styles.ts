import { StyleSheet } from "react-native";
import Colors from '../../themes/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'relative'
  },
  content: {},
  buttonWrapper: {
   position: 'absolute',
   bottom: 24,
   right: 24,
  },
  buttonAdd: {
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  }
});
