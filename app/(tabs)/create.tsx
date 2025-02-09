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

const Create = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // Changed description to desc
  const [date, setDate] = useState("");
  const [items, setItems] = useState([
    { name: "Masum", completed: false },
    { name: "Mahfuz", completed: false },
    { name: "Sudipto das", completed: true },
    { name: "Sajjad", completed: false },
  ]); // You can modify the items dynamically as needed
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("https://web.programming-hero.com/home"); // Default link value

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

  // Handle Create Post (send to backend)
  const handleCreatePost = async () => {
    if (!title || !desc || !date) {
      alert("Title, description, and date are required.");
      return; // Prevent sending the request if any required field is missing
    }

    try {
      const response = await fetch("http://localhost:5000/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc, // send as "desc"
          date,
          items, // send the items array as is
          image: image || imageUrl, // send image URL or the picked image
          link, // send the link (default or modified)
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Post created:", data);
        setModalVisible(false); // Close modal after success
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  return (
    <View className="bg-white h-[100vh] w-full flex items-center justify-center">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-orange-600 px-6 py-3 rounded-lg shadow-lg"
      >
        <Text className="text-white text-2xl font-bold uppercase">
          📝 Create
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-11/12 p-5 rounded-lg">
            <Text className="text-2xl font-bold text-gray-700 mb-3">
              Create New Post
            </Text>

            {/* Title Input */}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3 w-full"
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />

            {/* Description Input */}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3 w-full"
              placeholder="Enter description"
              value={desc} // Changed description to desc
              onChangeText={setDesc}
              multiline
            />

            {/* Date Input */}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3 w-full"
              placeholder="Enter date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />

            {/* Items Input (List of Students) */}
            <View className="mb-3">
              <Text className="font-semibold">Items (Students):</Text>
              {items.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between mb-2"
                >
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
                      item.completed ? "bg-green-600" : "bg-red-600"
                    } rounded`}
                  >
                    <Text className="text-white">
                      {item.completed ? "Completed" : "Not Completed"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Image Upload Section */}
            <View className="mb-3">
              <TouchableOpacity
                onPress={pickImage}
                className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
              >
                <Text className="text-white font-bold">📷 Upload Image</Text>
              </TouchableOpacity>

              {image && (
                <Image
                  source={{ uri: image }}
                  className="w-full h-40 rounded-lg"
                />
              )}

              {/* OR Image URL Input */}
              <TextInput
                className="border border-gray-300 rounded p-2 mt-3 w-full"
                placeholder="Enter image URL"
                value={imageUrl}
                onChangeText={setImageUrl}
              />
            </View>

            {/* Link Input */}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3 w-full"
              placeholder="Enter link"
              value={link}
              onChangeText={setLink}
            />

            {/* Buttons */}
            <View className="flex flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-green-600 px-4 py-2 rounded-lg"
                onPress={handleCreatePost}
              >
                <Text className="text-white font-bold">Done</Text>
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
    </View>
  );
};

export default Create;
