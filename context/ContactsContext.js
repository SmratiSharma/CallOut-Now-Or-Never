import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

// Create context
const ContactsContext = createContext();

// Provider component
export const ContactsProvider = ({ children }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Load contacts on app start
  useEffect(() => {
    const loadContacts = async () => {
      const data = await AsyncStorage.getItem("saved_contacts");
      if (data) {
        setSelectedContacts(JSON.parse(data));
      }
    };
    loadContacts();
  }, []);

  // Save contacts to storage when updated
  const saveContacts = async (contacts) => {
    try {
      await AsyncStorage.setItem("saved_contacts", JSON.stringify(contacts));
      setSelectedContacts(contacts);
    } catch (error) {
      console.log("Failed to save contacts", error);
    }
  };

  return (
    <ContactsContext.Provider
      value={{ selectedContacts, setSelectedContacts, saveContacts }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

// Custom hook to access context
export const useContacts = () => useContext(ContactsContext);
