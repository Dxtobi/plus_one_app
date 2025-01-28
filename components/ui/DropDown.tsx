import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Pressable } from 'react-native';

interface Option {
  value: string;
  label: string;
}

interface DropdownInputProps {
  options?: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  optionsClassName?: string;
  maxOptionsHeight?: number;
}


 const options_ = [
      { label: '500 - 1h', value: '500' },
      { label: '1000 - 3h', value: '1000' },
      { label: '2000 - 7h', value: '2000' },
      { label: '5000 - 12h', value: '5000' },
      { label: '15000 - 42h', value: '15000' },
    ];
const DropdownInput: React.FC<DropdownInputProps> = ({
  options = options_,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  containerClassName = '',
  inputClassName = '',
  optionsClassName = '',
  maxOptionsHeight = 160,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputLayout, setInputLayout] = useState({ 
    width: 0, 
    height: 0, 
    x: 0, 
    y: 0 
  });

  const handleLayout = (event: { nativeEvent: { layout: { width: any; height: any; x: any; y: any; }; }; }) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setInputLayout({ width, height, x, y });
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <View className={`relative ${isOpen ? 'z-20' : 'z-[1]'} ${containerClassName}`}>
      <TouchableOpacity
        onLayout={handleLayout}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
        className={`flex-row items-center justify-between p-3 border rounded-lg dark:bg-green-800 dark:text-neutral-100 text-neutral-800  dark:border-white border-green-500 ${inputClassName}`}
      >
        <Text className="text-base dark:text-green-600 text-green-700 flex-1 mr-2">
          {displayText}
        </Text>
        <Text className=" dark:text-green-600 text-green-700 text-lg">
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

        {isOpen && (
        <Pressable
          className="absolute bg-transparent"
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              top: inputLayout.y + inputLayout.height + 8,
              left: inputLayout.x,
              width: inputLayout.width,
              maxHeight: maxOptionsHeight,
            }}
            className={`absolute z-10 border rounded-lg shadow-lg ${optionsClassName} dark:bg-neutral-900 bg-neutral-200 border dark:border-white border-green-500`}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              className="w-full relative z-20"
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleSelect(option)}
                  className={`px-4 py-4 ${
                    selectedValue === option.value 
                      ? 'bg-green-300' 
                      : 'hover:bg-gray-50'
                  } ${inputClassName}`}
                  activeOpacity={0.7}
                >
                  <Text className="text-base dark:text-green-600 text-green-700">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      )}
       
    </View>
  );
};

export default DropdownInput;