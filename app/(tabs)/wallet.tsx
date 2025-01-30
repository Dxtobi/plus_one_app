import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextCustom from '@/components/ui/CustomText';

const demoTasks = [
  { id: '1', date: '2025-01-22', title: 'Pay rent', completed: false, reward: '5 points' },
  { id: '2', date: '2025-01-23', title: 'Comment', completed: false, reward: '10 points' },
  { id: '3', date: '2025-01-24', title: 'Like ', completed: true, reward: '2 points' },
  { id: '4', date: '2025-01-25', title: 'Follow ', completed: false, reward: '15 points' },
  { id: '5', date: '2025-01-26', title: 'Follow ', completed: false, reward: '20 points' },
  { id: '6', date: '2025-01-27', title: 'Like ', completed: false, reward: '8 points' },
  { id: '7', date: '2025-01-29', title: 'Comment', completed: false, reward: '10 points' },
  { id: '8', date: '2025-01-29', title: 'Like ', completed: true, reward: '2 points' },
  { id: '9', date: '2025-01-29', title: 'Follow ', completed: false, reward: '15 points' },
  { id: '10', date: '2025-01-29', title: 'Follow ', completed: false, reward: '20 points' },
  { id: '11', date: '2025-01-29', title: 'Like ', completed: false, reward: '8 points' },
];

const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);

  if (dayOfWeek === 0) {
    // If today is Sunday, show the previous 6 days
    startOfWeek.setDate(today.getDate() - 6);
  } else {
    // Otherwise, start from Sunday of the current week
    startOfWeek.setDate(today.getDate() - dayOfWeek);
  }


  const dates = [];
  const endOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek; // Number of days to include

  for (let i = 0; i <= endOfWeek; i++) {
    const current = new Date(startOfWeek);
    current.setDate(startOfWeek.getDate() + i);
    dates.push(current.toISOString().split('T')[0]);
  }

  return dates;
};

const TaskScreen = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentWeekDates()[getCurrentWeekDates().length-1]);
  const [tasks, setTasks] = useState(demoTasks);
  const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setWeekDates(getCurrentWeekDates());
    // Scroll to the current day on mount
    setTimeout(() => {
      if (scrollViewRef.current) {
        const index = weekDates.findIndex((date) => date === selectedDate);
        scrollViewRef.current.scrollTo({ x: index * 80, animated: true });
      }
    }, 0);
  }, []);

  const handleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <View className="flex-1  py-20">
      <TextCustom className="text-2xl font-bold p-4">GIGS</TextCustom>
      <View className='h-[20vh] justify-center items-center'>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          className="my-auto p-3 pr-10   w-[100%]"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          style={{height:0}}>
          {weekDates.map((date, i) => (
            <TouchableOpacity
              key={date}
              className={`px-4 py-2 rounded-lg h-[14vh] min-w-[25vw] justify-between ${
                date === selectedDate ? 'bg-green-700 dark:bg-neutral-900 ' : 'bg-green-200 dark:bg-neutral-500'
              } ${i==weekDates.length-1&&'mr-10'}`}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                className={`text-xl font-Poppins  ${
                  date === selectedDate ? 'text-white' : 'text-black'
                }`}
              >
                {new Date(date).toDateString().split(' ')[0]}
              </Text>
              <Text
                className={`font-Poppins pt-[14px]  text-5xl ${
                  date === selectedDate ? 'text-white' : 'text-black'
                }`}
              >
                {new Date(date).getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className='px-4 flex-1'>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskCompletion(item.id)} className={`flex-row justify-between items-end p-3 mb-2 rounded-xl  ${item.completed ? 'bg-neutral-100 dark:bg-neutral-950':'bg-neutral-200 dark:bg-neutral-900'}`} disabled={item.completed}>
           
           <View>
            <TextCustom className={`  font-Poppins_bold ${item.completed && ' text-gray-300'}`}>
              FaceBook: Margin Ritha
            </TextCustom>
            <TextCustom
                className={`text-base ${item.completed ? 'line-through text-gray-400':''} font-Poppins text-xl`}
              >
                {item.title}
              </TextCustom>
           </View>
            <TouchableOpacity onPress={() => handleTaskCompletion(item.id)} disabled={item.completed}>
              
              <Text className="text-green-600 text-sm">{item.reward}</Text>

            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      
      </View>
    </View>
  );
};

export default TaskScreen;
