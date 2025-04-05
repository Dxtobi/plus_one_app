import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TextCustom from '@/components/ui/CustomText';
import { completeGig, getGigsFromDate } from '@/utils/APIfunctions';
import { transformTasks } from '@/utils/HelperFunctions';
import { useAuth } from '@/context/AuthContext';


const getPlatformColor = (platform: string, completed: boolean): string => {
  const colors: { [key: string]: { light: string; dark: string } } = {
    facebook: { light: '#E7F3FF', dark: '#1877F2' },
    twitter: { light: '#E1EEFF', dark: '#1DA1F2' },
    instagram: { light: '#FFF0F5', dark: '#E1306C' },
    linkedin: { light: '#EBF5FF', dark: '#0A66C2' },
    youtube: { light: '#FFECEC', dark: '#FF0000' },
    whatsapp: { light: '#DCF8C6', dark: '#25D366' },
    tiktok: { light: '#FFF0F5', dark: '#000000' },
  };

  const platformColors = colors[platform] || { light: '#FFFFFF', dark: '#000000' };
  return completed ? platformColors.light : platformColors.dark;
};


const getPlatformIcon = (platform: string, completed: boolean) => {
  const iconProps = {
    size: 20,
    color: completed ? 'black' : 'white',
  };

  switch (platform) {
    case 'facebook':
      return <FontAwesome name="facebook" {...iconProps} />;
    case 'twitter':
      return <FontAwesome6 name="x-twitter" {...iconProps} />;
    case 'instagram':
      return <FontAwesome name="instagram" {...iconProps} />;
    case 'linkedin':
      return <FontAwesome name="linkedin" {...iconProps} />;
    case 'youtube':
      return <FontAwesome name="youtube" {...iconProps} />;
    case 'whatsapp':
      return <FontAwesome name="whatsapp" {...iconProps} />;
    case 'tiktok':
      return <FontAwesome5 name="tiktok" {...iconProps} />;
    default:
      return null;
  }
};





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

interface Task {
  id: any;
  date: any;
  title: any;
  completed: any;
  reward: string;
  platform:string;
  displayname:string;
  url:string
}
const TaskScreen = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentWeekDates()[getCurrentWeekDates().length-1]);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userID, setUserId] = useState('');

  const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
  const scrollViewRef = useRef<ScrollView>(null);
  const { decoded } = useAuth()
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getGigsFromDate(selectedDate);
        
        const userId = fetchedTasks.id
        const tt = transformTasks(fetchedTasks.data, userId)
        setTasks(tt);
        
        // console.log(tt)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  useEffect(() => {
    setUserId(decoded.id)
  }, [decoded]);

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
    completeGig(taskId).then((response) => {
      console.log('Task completed:', response);
    }).catch((error) => {
      console.error('Error completing task:', error);
    });
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
          <TouchableOpacity
            onPress={() => handleTaskCompletion(item.id)}
            className={`flex-row justify-between items-center p-3 mb-2 rounded-xl ${
              item.completed ? 'bg-opacity-30' : 'bg-opacity-70'
            }`}
            style={{
              backgroundColor: getPlatformColor(item.platform, item.completed), // Dynamically set background color
            }}
            disabled={item.completed}
          >
            {/* Left Section: Task Details */}
            <View>
              <TextCustom
                className={`capitalize ${
                  'text-white'
                }`}
              >
                {item?.platform}: {item.displayname}
              </TextCustom>
              <TextCustom
                className={`text-base font-Poppins capitalize ${
                  'text-white'
                }`}
              >
                {item.title}
              </TextCustom>
            </View>

            {/* Right Section: Platform Icon and Reward */}
            <TouchableOpacity
              onPress={() => handleTaskCompletion(item.id)}
              disabled={item.completed}
              className="items-center"
            >
              {getPlatformIcon(item.platform, item.completed)}
              <Text
                className={`text-sm ${
                 'text-white'
                }`}
              >
                {item.reward}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      
      </View>
    </View>
  );
};

export default TaskScreen;
