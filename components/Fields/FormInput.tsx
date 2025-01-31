import { ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { InputModeOptions, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

interface IProps {
  control: Control<any>;
  required?: boolean;
  name: string;
  label: string;
  placeholder?: string;
  type?: InputModeOptions;
  secret?: boolean
}

const FormInput = (props: IProps) => {
  const { control, required, name, label, placeholder, type, secret } = props;
  const theme = useTheme()
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field: {onBlur, onChange, value}, formState: {errors} }) => {
        return (
        <View style={{width: 'auto'}}>
          <Text>{label}</Text>
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            inputMode={type ?? "text"}
            mode="outlined"
            secureTextEntry={secret}
            style={{height: 45}}
            outlineStyle={{borderRadius: 10, borderColor: theme.colors.primary}}
          />
          {errors[name] && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {errors[name].message as ReactNode}
            </Text>
          )}
        </View>
      )}}
    />
  );
};

export default FormInput;
