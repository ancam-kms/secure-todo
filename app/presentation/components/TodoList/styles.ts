import { StyleSheet } from "react-native";
import colors from "../../themes/colors";
export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyTextDesc: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonAddNew: {
    borderRadius: 12,
    borderColor: colors.primary,
    borderWidth: 1,
    width: 100,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  buttonAddTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600'
  },
  itemSeparator: {
    height: 8,
  },
  contentContainerList: {
    paddingVertical: 12,
  }
});
