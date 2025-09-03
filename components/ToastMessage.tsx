import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

// Define the props interface for type safety.
interface ToastComponentProps {
  message: string;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ message }) => {
  // This function will be called once after the component mounts.
  useEffect(() => {
    // Show the toast with the message passed as a prop.
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: message,
      position: "top",
      visibilityTime: 4000,
    });
  }, []); // The empty array ensures this effect runs only once.

  // The component doesn't need to render any UI, so we return null.
  return null;
};

export default ToastComponent;
