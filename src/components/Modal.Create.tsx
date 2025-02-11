import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
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
}

const CreateModal: React.FC<ModalComponentProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([
    { name: "", completed: false },
    { name: "", completed: false },
    { name: "", completed: true },
    { name: "", completed: false },
  ]);
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("https://web.programming-hero.com/home");

  // Handle Image Upload and Compression
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.5 }
      );
      setImage(manipulatedImage.uri);
    }
  };

  // Handle Create Post
  const handleCreatePost = async () => {
    if (!title || !desc || !date) {
      alert("Title, description, and date are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://listify-backend.vercel.app/api/lists",
        {
          method: "POST",
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
        console.log("Post created:", data);
        setModalVisible(false);
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-11/12 p-5 rounded-lg">
          <Text className="text-2xl font-bold uppercase text-gray-700 mb-3 text-center">
            <Text className="text-orange-500">Create</Text> New List
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
            <Text className="font-semibold">List:</Text>
            {items.map((item, index) => (
              <View key={index} className="flex flex-row justify-between mb-2">
                <TextInput
                  className="border border-gray-300 rounded p-2 mb-1 w-5/12"
                  placeholder="Enter name or list no"
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
              onPress={handleCreatePost}
            >
              <Text className="text-white font-bold">Create</Text>
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

export default CreateModal;
