import { Button, KeyboardTypeOptions, TextInput, View, TouchableOpacity, Text} from "react-native";
import TextCustom from "./CustomText";

interface ButtonCustomProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  text:string;
  onPress:()=>void;

}

const CustomButton: React.FC<ButtonCustomProps> = ({ className = "", children, isDisabled, isLoading=false, text, onPress }) => {
  return (
    <TouchableOpacity disabled={isDisabled} className={`${className} text-xl font-light  bg-green-300 dark:bg-green-800 rounded-2xl p-4 justify-center my-8 flex-row`} onPress={onPress} >
       {!isLoading?<Text className="dark:text-neutral-100 text-neutral-100 m-auto w-fit text-center text-xl">{text}</Text>:<Loading/>}
    </TouchableOpacity>
  );
};

const Loading = () => {
  return (
    <View><Text>Loading...</Text></View>
  );
};

export default CustomButton;
