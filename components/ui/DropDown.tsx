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
    { label: '1000 - 1h', value: '1' },      // 1 hour, 1000 points
    { label: '4800 - 6h', value: '6' },      // 6 hours, 4800 points
    { label: '8600 - 12h', value: '12' },    // 12 hours, 8600 points
    { label: '12400 - 1day', value: '24' },   // 24 hours (1 day), 12400 points
    { label: '16200 - 2 days', value: '48' },   // 48 hours (2 days), 16200 points
    { label: '20000 - 1 week', value: '168' }, // 168 hours (1 week), 20000 points
    ];
const DropdownInput: React.FC<DropdownInputProps> = ({
  options = options_,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  containerClassName = '',
  inputClassName = '',
  optionsClassName = '',
  maxOptionsHeight = 800,
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
        className={`flex-row items-center justify-between p-3 border rounded-lg  text-neutral-100   ${inputClassName}`}
      >
        <Text className="text-base text-white  flex-1 mr-2">
          {displayText}
        </Text>
        <Text className=" text-white text-lg">
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
            className={`absolute z-10 border rounded-lg shadow-lg   dark:border-white  ${optionsClassName}`}
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
                  <Text className="text-base text-white">
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