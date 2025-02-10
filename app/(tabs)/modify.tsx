import UpdateModal from "@/src/components/Update.Modal";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  _id: string;
}

const Modify = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>(null);

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

  // Handle Delete Action
  const handleDelete = (id: string) => {
    Alert.alert("Delete List", "Are you sure you want to delete this list?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/lists/${id}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              const data = await response.json();
              setLists((prevLists) =>
                prevLists.filter((list) => list._id !== id)
              );
              Alert.alert(
                "Success",
                data.message || "List deleted successfully"
              );
            } else {
              const errorData = await response.json();
              Alert.alert("Error", errorData.message || "Error deleting list");
            }
          } catch (error) {
            console.error("Error deleting list:", error);
            Alert.alert("Error", "Error deleting list");
          }
        },
      },
    ]);
  };

  // Handle Update Action
  const handleUpdate = (list: List) => {
    setSelectedList(list); // Set the selected list for update
    setModalVisible(true); // Open the modal
  };

  // Handle updated list data from the modal
  const handleUpdatedList = (updatedList: List) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === updatedList._id ? updatedList : list
      )
    );
  };

  const renderItem = ({ item }: { item: List }) => (
    <View className="bg-white rounded-lg mx-4 my-4 p-5 w-[90%] border border-gray-200">
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

      <View className="flex-row justify-evenly mt-4">
        <TouchableOpacity onPress={() => handleUpdate(item)}>
          <Ionicons
            name="create-outline"
            size={28}
            color="orange"
            className="font-bold"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Ionicons name="trash-bin-outline" size={28} color="red" />
        </TouchableOpacity>
      </View>

      {item.link && (
        <TouchableOpacity
          className="mt-5 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full shadow-md"
          onPress={() => console.log("Navigating to:", item.link)}
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
      <Text className="text-2xl text-orange-600 font-extrabold uppercase mb-6 tracking-wide">
        📝 Update & Delete!
      </Text>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item, idx) => `${idx}`}
      />

      {/* UpdateModal */}
      {selectedList && (
        <UpdateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedList={selectedList}
          onUpdate={handleUpdatedList}
        />
      )}
    </View>
  );
};

export default Modify;
