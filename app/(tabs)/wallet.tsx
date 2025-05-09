// WalletScreen.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons'; // Good for general UI icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Good for currency/specific icons
import TextCustom from '@/components/ui/CustomText'; // Assuming you have this
import { formatCurrency } from '@/utils/HelperFunctions'; // Assuming you have this
import { useColorScheme } from 'nativewind';
// import { useAuth } from '@/context/AuthContext'; // If needed for user data
// import { getWalletDetails, getTransactions } from '@/utils/APIwallet'; // You'll create these

// Define types for wallet data and transactions
interface WalletData {
  balanceNGN: number;
  points: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out' | 'purchase';
  amount: number;
  currency: 'NGN' | 'Points';
  date: string; // Or Date object
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

// Mock Data - Replace with API calls
const mockWalletData: WalletData = {
  balanceNGN: 150750.25,
  points: 12500,
};

const mockTransactions: Transaction[] = [
  { id: '1', type: 'deposit', amount: 50000, currency: 'NGN', date: '2023-10-26', description: 'Bank Deposit', status: 'completed' },
  { id: '2', type: 'purchase', amount: 1500, currency: 'NGN', date: '2023-10-25', description: 'X Impressions Boost', status: 'completed' },
  { id: '3', type: 'withdrawal', amount: 10000, currency: 'NGN', date: '2023-10-24', description: 'Withdrawal to GTBank', status: 'completed' },
  { id: '4', type: 'transfer_in', amount: 500, currency: 'Points', date: '2023-10-23', description: 'Points from @john_doe', status: 'completed' },
  { id: '5', type: 'purchase', amount: 750, currency: 'Points', date: '2023-10-22', description: 'Whatsapp Boost', status: 'pending' },
  { id: '6', type: 'deposit', amount: 2000, currency: 'NGN', date: '2023-10-21', description: 'Card Top-up', status: 'failed' },
];

const WalletScreen = () => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [walletData, setWalletData] = useState<WalletData | null>(mockWalletData); // Initialize with mock or null
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions); // Initialize with mock or empty
  const [displayMode, setDisplayMode] = useState<'currency' | 'points'>('currency');

  // useEffect(() => {
  //   // Fetch wallet data and transactions
  //   const fetchData = async () => {
  //     try {
  //       // const [walletRes, transactionsRes] = await Promise.all([
  //       //   getWalletDetails(),
  //       //   getTransactions(),
  //       // ]);
  //       // setWalletData(walletRes);
  //       // setTransactions(transactionsRes);
  //     } catch (error) {
  //       console.error('Error fetching wallet data:', error);
  //       // Handle error (e.g., show a message to the user)
  //     }
  //   };
  //   fetchData();
  // }, []);

  const toggleDisplayMode = () => {
    setDisplayMode(prevMode => (prevMode === 'currency' ? 'points' : 'currency'));
  };

  const getTransactionIcon = (type: Transaction['type'], status: Transaction['status']) => {
    let iconName: keyof typeof Ionicons.glyphMap = 'help-circle-outline';
    let color = isDark ? 'gray' : 'gray';

    if (status === 'failed') {
        iconName = 'close-circle';
        color = 'red';
    } else if (status === 'pending') {
        iconName = 'time';
        color = isDark ? 'yellow' : '#D97706'; // amber-500
    } else { // completed
        switch (type) {
            case 'deposit':
            case 'transfer_in':
                iconName = 'arrow-down-circle';
                color = 'green';
                break;
            case 'withdrawal':
            case 'transfer_out':
            case 'purchase':
                iconName = 'arrow-up-circle';
                color = isDark ? '#F87171' : '#DC2626'; // red-400 or red-600
                break;
        }
    }
    return <Ionicons name={iconName} size={28} color={color} />;
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View className="flex-row items-center justify-between py-3 my-1  rounded-lg">
      <View className="flex-row items-center flex-1">
        {getTransactionIcon(item.type, item.status)}
        <View className="ml-3 flex-shrink">
          <TextCustom className="text-base font-medium text-gray-800 dark:text-gray-100 capitalize" >
            {item.description || item.type.replace('_', ' ')}
          </TextCustom>
          <TextCustom className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.date).toLocaleDateString()} - {item.status}
          </TextCustom>
        </View>
      </View>
      <View className="ml-2 items-end">
        <TextCustom
          className={`text-base font-semibold ${
            item.type === 'deposit' || item.type === 'transfer_in'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          } ${item.status === 'failed' ? 'text-red-500 dark:text-red-500 line-through' : ''}
             ${item.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' : ''}
          `}
        >
          {item.type === 'deposit' || item.type === 'transfer_in' ? '+' : '-'}
          {item.currency === 'NGN'
            ? formatCurrency(item.amount, { currency: 'NGN', currencyDisplay: 'symbol' })
            : `${item.amount} pts`}
        </TextCustom>
      </View>
    </View>
  );

  const displayedAmount = displayMode === 'currency'
    ? formatCurrency(walletData?.balanceNGN ?? 0, { currency: 'NGN', currencyDisplay: 'symbol' })
    : `${walletData?.points ?? 0} Points`;

  const displayedSubText = displayMode === 'currency'
    ? `${walletData?.points ?? 0} Points Available`
    : formatCurrency(walletData?.balanceNGN ?? 0, { currency: 'NGN', currencyDisplay: 'symbol' }) + ' Available';

  return (
    <ScrollView
      className="bg-gray-50 dark:bg-black  pb-5" // Twitter dark background is often very dark gray or black
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="mb-6 py-8 bg-green-100 dark:bg-green-900 pt-16">
        <TextCustom className="text-gray-500 dark:text-gray-100 bg-green-300 text-sm text-center dark:bg-green-600 rounded-full w-[40%] p-3 m-auto">
          Available Balance
        </TextCustom>
        <TouchableOpacity onPress={toggleDisplayMode} activeOpacity={0.7} className='py-10'>
          <Text className="text-5xl py-2 text-center font-Exo_bold text-green-600 dark:text-green-400">
            {displayedAmount}
          </Text>
        </TouchableOpacity>
        <TextCustom className="text-gray-600 dark:text-gray-300 text-sm text-center">
          {displayedSubText}
        </TextCustom>
      </View>
      <View className='bg-gray-50 dark:bg-black  pb-5'>
            {/* Action Buttons */}
            <View className="flex-row justify-around my-6">
                <TouchableOpacity
                className="flex-col items-center justify-center bg-green-500 dark:bg-green-600 py-3 px-6 rounded-lg w-[45%]"
                onPress={() => {}} // Ensure this route exists
                >
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <TextCustom className="text-white text-base font-medium mt-1">Add Funds</TextCustom>
                </TouchableOpacity>

                <TouchableOpacity
                className="flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 py-3 px-6 rounded-lg w-[45%]"
                onPress={() => {}} // Ensure this route exists
                >
                <Ionicons name="arrow-down-circle-outline" size={24} color={isDark ? 'white' : 'black'} />
                <TextCustom className="text-black dark:text-white text-base font-medium mt-1">Withdraw</TextCustom>
                </TouchableOpacity>
            </View>

            {/* Transaction History */}
            <View className="mt-4 mb-2 px-4 flex-row justify-between items-center">
                <TextCustom className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Recent Activity
                </TextCustom>
                {/* <TouchableOpacity onPress={() => {}}>
                    <TextCustom className="text-blue-500 dark:text-blue-400">See All</TextCustom>
                </TouchableOpacity> */}
            </View>

           <View className='px-4'>
            {transactions.length > 0 ? (
                    <FlatList
                    data={transactions.slice(0, 5)} // Show limited items on this screen
                    renderItem={renderTransactionItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false} // Disable scroll for FlatList inside ScrollView
                    ItemSeparatorComponent={() => <View className="h-px my-2 bg-gray-100 dark:bg-gray-800" />}
                    />
                ) : (
                    <View className="items-center justify-center py-10">
                    <Ionicons name="list-outline" size={48} color={isDark ? "gray" : "lightgray"} />
                    <TextCustom className="text-gray-500 dark:text-gray-400 mt-2">No transactions yet.</TextCustom>
                    </View>
                )}
           </View>
     </View>
      <View className="h-[10vh]" />
    </ScrollView>
  );
};

export default WalletScreen;

// You might not need StyleSheet if Tailwind covers everything.
// const styles = StyleSheet.create({
//   // Example: if you need very specific non-Tailwind styles
// });