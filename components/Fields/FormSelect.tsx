import { Picker } from "@react-native-picker/picker";
import { ReactNode, useRef } from "react";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface IProps {
  control: Control<any>;
  required?: boolean;
  name: string;
  label: string;
  items: {
    label: string;
    value: string;
  }[];
}

const FormSelect = (props: IProps) => {
  const { control, name, label, required, items } = props;
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required,
      }}
      render={({
        field: { onChange, value, onBlur },
        formState: { errors },
      }) => (
        <>
          <Text>{label}</Text>
          <View style={{
                borderWidth: 1,
                backgroundColor: theme.colors.background,
                borderRadius: 10,
                borderColor: theme.colors.primary,
                
                }}>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue, index) => {
                onChange(itemValue);
                }}
                onBlur={onBlur}
                mode="dropdown"
                style={{ height: 50}}
            >
                {items.map((item) => (
                <Picker.Item key={item.label} label={item.label} value={item.value} />
                ))}
            </Picker>
          </View>
          
          {errors[name] && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {errors[name].message as ReactNode}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default FormSelect;
