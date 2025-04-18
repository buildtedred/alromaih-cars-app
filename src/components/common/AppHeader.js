import React from 'react';
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useLocale } from '../../contexts/LocaleContext';
import { useNavigation } from '@react-navigation/native';
import EnglishSvg from '../../assets/english.svg';
import ArabicSvg from '../../assets/arabic.svg';

export default function AppHeader() {
  const { toggleLocale, locale } = useLocale();
  const navigation = useNavigation();

  return (
    <View className="bg-white p-4 shadow-md rounded-b-2xl">
      {/* Header top row: logo and language toggle */}
      <View className="flex-row justify-between items-center mb-3">
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={{ width: 100, height: 30, resizeMode: 'contain' }}
        />
        <TouchableOpacity onPress={toggleLocale}>
          {locale === 'en' ? (
            <EnglishSvg width={32} height={24} />
          ) : (
            <ArabicSvg width={32} height={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Tappable search bar (navigates to Search screen) */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2"
        activeOpacity={0.7}
      >
        <Feather name="search" size={20} color="#999" />
        <Text className="ml-2 text-sm text-gray-600">
          {locale === 'en' ? 'Search used cars' : 'ابحث عن السيارات'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
