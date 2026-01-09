import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 12,
      marginVertical: 1,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontWeight: "700",
      fontSize: 16,
      flex: 1,
    },
    deleteButton: {
      padding: 4,
      marginLeft: 8,
    },
    deleteButtonText: {
      fontSize: 12,
    },
    description: {
      fontStyle: "italic",
      fontSize: 14,
      marginTop: 2,
    },
    datesRow: {
      marginTop: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dueDate: {
      fontSize: 12,
      color: "#555",
    },
    currentDate: {
      fontSize: 12,
      color: "red",
      fontWeight: "600",
    },
    swipeable: {

    },
    rightAction: {
      width: '120%',
      height: '100%',
      margin: 2,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: '#e30000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightDeleteText: {
      color: '#fff',
      fontWeight: '600',
      paddingLeft: 12,
      paddingRight: 2,
    }
  });
  