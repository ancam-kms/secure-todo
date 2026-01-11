
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { fontFamily, typography } from "../../themes/typography";
import Colors from "../../themes/colors";

type Variant = keyof typeof typography;

type Props = TextProps & {
  variant?: Variant;
  color?: string;
};

function AppText({
  variant = "body",
  color = Colors.text,
  style,
  ...props
}: Props) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typography[variant],
        { color },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    fontFamily: fontFamily.regular,
  },
});

export default AppText;