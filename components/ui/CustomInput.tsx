import { KeyboardTypeOptions, TextInput, View} from "react-native";
import TextCustom from "./CustomText";

interface TextCustomProps {
  className?: string;
  onChangeText_:(txt: string)=>void;
  placeholder:string;
  keyboardType:KeyboardTypeOptions;
  error?:string|null;
  value:any

}

const CustomInput: React.FC<TextCustomProps> = ({ className = "", onChangeText_, placeholder, keyboardType, error, value }) => {
  return (
    <View>
        {error&&<TextCustom>{error}</TextCustom>}
        <TextInput className={`${className} text-xl font-light dark:text-neutral-100 text-neutral-800 border dark:border-white border-green-500  placeholder:text-gray-400`} placeholder={placeholder} value={value}  onChangeText={onChangeText_} keyboardType={keyboardType}></TextInput>
    </View>
  );
};

export default CustomInput;
