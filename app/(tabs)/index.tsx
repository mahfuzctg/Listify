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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://listify-backend.vercel.app/api/lists"
        );
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: List }) => (
    <View className="bg-white  rounded-lg mx-4 my-4 p-5 w-[90%] border border-gray-200">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="h-48 w-full rounded-lg mb-4 object-cover"
        />
      )}

      <Text className="text-2xl font-bold text-gray-900 tracking-wide mb-1">
        {item.title}
      </Text>

      <Text className="text-gray-600 text-sm leading-5 mb-2">{item.desc}</Text>

      <Text className="text-xs font-medium text-gray-500 italic mb-3">
        📅 {item.date}
      </Text>

      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center py-2 px-3 bg-gray-100 rounded-lg my-1">
            <Text className="text-gray-800 font-medium">{item.name}</Text>
            <Text
              className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                item.completed
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {item.completed ? "✓ Completed" : "✗ Pending"}
            </Text>
          </View>
        )}
        keyExtractor={(i, idx) => `${idx}`}
      />

      {item.link && (
        <TouchableOpacity
          className="mt-5 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full shadow-md"
          onPress={() => {
            console.log("Navigating to:", item.link);
          }}
        >
          <Text className="text-white text-center font-semibold text-lg">
            🔗 View Full List
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="bg-gray-100 flex-1 items-center justify-center py-6">
      <Text className="text-xl  font-extrabold uppercase mb-6 tracking-wide">
        📝 Welcome to <Text className="text-orange-600">Listify</Text>
      </Text>

      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${idx}`}
      />
    </View>
  );
};

export default Homes;
