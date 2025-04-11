import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { useLocale } from "../../contexts/LocaleContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";


export default function CarCard({ car }) {
  const { locale, direction } = useLocale();
  const navigation = useNavigation();
  const isRTL = direction === "rtl";

  const [scale] = useState(new Animated.Value(1));
  const getLang = (field) => (locale === "en" ? field?.en : field?.ar);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const goToGallery = () => {
    navigation.navigate("Gallery", { car }); // Pass the car object to Gallery screen
  };

  return (
    <TouchableOpacity
      activeOpacity={0.97}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={goToGallery}
      style={{ transform: [{ scale }] }}
      className="w-full bg-white rounded-2xl shadow-md mb-5 overflow-hidden"
    >
      {/* Car Image Section */}
      <View className="relative w-full h-40 bg-white px-4 py-2">
        <Image
          source={car.image}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Car Info */}
      <View className="p-4">
        <Text
          className={`text-lg font-bold text-gray-800 mb-2 ${isRTL ? "text-right" : "text-left"}`}
        >
          {getLang(car.name)}
        </Text>

        <View
          className={`flex flex-row items-center justify-between mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Text
            className={`text-lg font-bold text-[#46194F] ${isRTL ? "text-right" : "text-left"}`}
          >
            {car.cashPrice?.toLocaleString()} {locale === "en" ? "SAR" : "ر.س"}
          </Text>
          <View className="bg-[#f0e6f5] px-2.5 py-1 rounded-md">
            <Text className="text-xs font-semibold text-[#46194F]">
              {locale === "en" ? "From" : "من"} {car.installmentPrice}{" "}
              {locale === "en" ? "/mo" : "/شهر"}
            </Text>
          </View>
        </View>

        <View
          className={`flex flex-row items-center justify-between py-3 border-t border-b border-gray-100 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <View className="flex flex-row items-center">
            <Icon name="calendar" size={14} color="#666" />
            <Text
              className={`text-xs text-gray-600 ${isRTL ? "mr-1.5" : "ml-1.5"}`}
            >
              {car.specs.year}
            </Text>
          </View>

          <View className="flex flex-row items-center">
            <Icon name="tachometer" size={14} color="#666" />
            <Text
              className={`text-xs text-gray-600 ${isRTL ? "mr-1.5" : "ml-1.5"}`}
            >
              {car.specs.mileage || "0 km"}
            </Text>
          </View>

          <View className="flex flex-row items-center">
            <Icon name="gear" size={14} color="#666" />
            <Text
              className={`text-xs text-gray-600 ${isRTL ? "mr-1.5" : "ml-1.5"}`}
            >
              {getLang(car.specs.transmission) ||
                (locale === "en" ? "Auto" : "أوتوماتيك")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
