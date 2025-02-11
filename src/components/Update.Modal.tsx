import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedList: any; // List data to be updated
  onUpdate: (updatedList: any) => void; // Callback to handle the updated list after save
}

const UpdateModal: React.FC<ModalComponentProps> = ({
  modalVisible,
  setModalVisible,
  selectedList,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([{ name: "", completed: false }]);
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");

  // Populate the modal with selected list data
  useEffect(() => {
    if (selectedList) {
      setTitle(selectedList.title);
      setDesc(selectedList.desc);
      setDate(selectedList.date);
      setItems(selectedList.items || []);
      setImage(selectedList.image || null);
      setImageUrl(selectedList.imageUrl || "");
      setLink(selectedList.link || "");
    }
  }, [selectedList]);

  // Handle Image Upload and Compression (same as before)
  const pickImage = async () => {
    // your code for image selection and compression
  };

  // Handle Update List
  const handleUpdateList = async () => {
    if (!title || !desc || !date) {
      alert("Title, description, and date are required.");
      return;
    }

    try {
      const response = await fetch(
        `https://listify-backend.vercel.app/api/lists/${selectedList._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            desc,
            date,
            items,
            image: image || imageUrl,
            link,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("List updated:", data);
        onUpdate(data); // Notify parent component about the updated list
        setModalVisible(false); // Close the modal
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error updating list:", error);
      alert("Error updating list");
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-11/12 p-5 rounded-lg">
          <Text className="text-2xl font-bold uppercase text-gray-700 mb-3 text-center">
            <Text className="text-orange-500">Update</Text> List
          </Text>

          <TextInput
            className="border border-gray-300 rounded p-2 mb-3 w-full"
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="border border-gray-300 rounded p-2 mb-3 w-full"
            placeholder="Enter description"
            value={desc}
            onChangeText={setDesc}
            multiline
          />

          <TextInput
            className="border border-gray-300 rounded p-2 mb-3 w-full"
            placeholder="Enter date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />

          <View className="mb-3">
            <Text className="font-semibold">Items (Students):</Text>
            {items.map((item, index) => (
              <View key={index} className="flex flex-row justify-between mb-2">
                <TextInput
                  className="border border-gray-300 rounded p-2 mb-1 w-5/12"
                  placeholder="Enter student name"
                  value={item.name}
                  onChangeText={(text) => {
                    const updatedItems = [...items];
                    updatedItems[index].name = text;
                    setItems(updatedItems);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    const updatedItems = [...items];
                    updatedItems[index].completed =
                      !updatedItems[index].completed;
                    setItems(updatedItems);
                  }}
                  className={`p-2 ${
                    item.completed ? "bg-gray-800" : "bg-orange-500"
                  } rounded`}
                >
                  <Text className="text-white">
                    {item.completed ? "Completed" : "Not Completed"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View className="mb-3">
            <TouchableOpacity
              onPress={pickImage}
              className="bg-orange-500 px-4 py-2 rounded-lg mb-2"
            >
              <Text className="text-white font-bold">📷 Upload Image</Text>
            </TouchableOpacity>

            {image && (
              <Image
                source={{ uri: image }}
                className="w-full h-40 rounded-lg"
              />
            )}

            <TextInput
              className="border border-gray-300 rounded p-2 mt-3 w-full"
              placeholder="Enter image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
          </View>

          <TextInput
            className="border border-gray-300 rounded p-2 mb-3 w-full"
            placeholder="Enter link"
            value={link}
            onChangeText={setLink}
          />

          <View className="flex flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-orange-500 px-4 py-2 rounded-lg"
              onPress={handleUpdateList}
            >
              <Text className="text-white font-bold">Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-red-600 px-4 py-2 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
