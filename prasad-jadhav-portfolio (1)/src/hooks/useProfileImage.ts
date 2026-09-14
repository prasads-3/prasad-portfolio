import { useState, useEffect } from 'react';
import { PERSONAL_DETAILS } from '../constants/data';

export const useProfileImage = () => {
  const [image, setImage] = useState<string>(PERSONAL_DETAILS.profileImage);

  useEffect(() => {
    const savedImage = localStorage.getItem('profile_image');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('profile_image', base64String);
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const setImageUrl = (url: string) => {
    localStorage.setItem('profile_image', url);
    setImage(url);
  };

  const resetImage = () => {
    localStorage.removeItem('profile_image');
    setImage(PERSONAL_DETAILS.profileImage);
  };

  return { image, uploadImage, setImageUrl, resetImage };
};
