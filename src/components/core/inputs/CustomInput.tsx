import React from "react";
import { KeyboardTypeOptions, StyleProp, View, ViewStyle } from "react-native";
import TextField from "./TextField";
import { cn } from "@/utils/cn";
import { getStyles } from "../../../utils/funcs/components";

interface Props {
  onChange?: (text: string) => void;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  type?: "text" | "password" | "secure-text";
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomInput = (props: Props) => {
  const {
    onChange,
    type,
    leftSection,
    style,
    secureTextEntry,
    keyboardType,
    placeholder,
    rightSection,
    className,
  } = props;

  const _style = getStyles(style);

  return (
    <View
      style={_style}
      className={cn(
        "flex-row items-center border-2 border-gray-300 p-1 rounded-md",
      )}
    >
      {leftSection}
      <TextField
        onChangeText={onChange}
        keyboardType={keyboardType ?? "default"}
        className=" w-full h9 flex-row items-center outline-none p-2"
        style={{ color: "black" }}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        type={type}
      />
      {rightSection}
    </View>
  );
};

export default CustomInput;
