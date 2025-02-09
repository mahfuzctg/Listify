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
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // Handle Image Upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="bg-white h-[100vh] w-full flex items-center justify-center">
      {/* Create Button */}
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
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Date Input */}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3 w-full"
              placeholder="Enter date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />

            {/* Image Upload Section */}
            <View className="mb-3">
              <TouchableOpacity
                onPress={pickImage}
                className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
              >
                <Text className="text-white font-bold">📷 Upload Image</Text>
              </TouchableOpacity>

              {/* Image Preview */}
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

            {/* Buttons */}
            <View className="flex flex-row justify-between mt-4">
              {/* Done Button */}
              <TouchableOpacity
                className="bg-green-600 px-4 py-2 rounded-lg"
                onPress={() => {
                  setModalVisible(false);
                  console.log({ title, description, date, image, imageUrl });
                }}
              >
                <Text className="text-white font-bold">Done</Text>
              </TouchableOpacity>

              {/* Close Button */}
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
