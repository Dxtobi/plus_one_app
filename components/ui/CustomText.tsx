import { Text } from "react-native";

interface TextCustomProps {
  className?: string;
  children: React.ReactNode;
}

const TextCustom: React.FC<TextCustomProps> = ({ className = "", children }) => {
  return (
    <Text className={` dark:text-neutral-100 text-neutral-800 ${className} `}>
      {children}
    </Text>
  );
};

export default TextCustom;
