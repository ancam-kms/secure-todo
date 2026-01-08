import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    ...(Platform.OS === "android" && { textAlignVertical: "top" }),
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    minHeight: 50,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    color: "#999",
  },
  datePickerContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  datePickerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 40,
  },
  buttonSpacer: {
    width: 12,
  },
  subtaskInputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  subtaskInput: {
    flex: 1,
  },
  addSubtaskButton: {
    backgroundColor: "#841584",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  addSubtaskButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  addSubtaskButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addSubtaskButtonTextDisabled: {
    color: "#999",
  },
  subtasksList: {
    marginTop: 12,
    gap: 8,
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#841584",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#841584",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtaskTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  subtaskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  removeButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#ff4444",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
  },
});
