import CreateModal from "@/src/components/Modal.Create";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Create = () => {
  const [modalVisible, setModalVisible] = useState(false);

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

      {/* Modal Component */}
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Create;
