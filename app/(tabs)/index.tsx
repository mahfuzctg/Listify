import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface Item {
  name: string;
  completed: boolean;
}

interface List {
  title: string;
  desc: string;
  date: string;
  items: Item[];
  image?: string;
  link?: string;
}

const Homes = () => {
  const [lists, setLists] = useState<List[]>([]);

  // Fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lists");
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: List }) => (
    <View className="bg-white shadow-md rounded-lg m-4 p-4 w-[90%]">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="h-40 w-full rounded-md mb-4"
        />
      )}
      <Text className="text-xl font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-gray-600 mb-2">{item.desc}</Text>
      <Text className="text-sm text-gray-500">{item.date}</Text>

      {/* Render Items */}
      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center my-2">
            <Text
              className={item.completed ? "text-green-600" : "text-red-600"}
            >
              {item.name}
            </Text>
            <Text
              className={item.completed ? "text-green-600" : "text-red-600"}
            >
              {item.completed ? "Completed" : "Pending"}
            </Text>
          </View>
        )}
        keyExtractor={(i, idx) => `${idx}`}
      />

      {item.link && (
        <TouchableOpacity
          className="mt-4 p-2 bg-orange-600 rounded-full"
          onPress={() => {
            // Handle link navigation
            console.log("Navigating to:", item.link);
          }}
        >
          <Text className="text-white text-center font-semibold">
            View Full List
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="bg-gray-100 flex-1 items-center justify-center">
      <Text className="text-3xl text-orange-600 font-bold uppercase mb-6">
        🧑‍💼 Welcome to Listify
      </Text>

      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${idx}`}
        // contentContainerStyle="px-4 py-2"
      />
    </View>
  );
};

export default Homes;
