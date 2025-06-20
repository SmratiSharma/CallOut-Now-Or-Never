import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactsScreen() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleAddContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access contacts");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    // Filter contacts with at least one phone number
    const filtered = data.filter(
      (c) => c.phoneNumbers && c.phoneNumbers.length > 0
    );
    setPhoneContacts(filtered);
    setShowModal(true);
  };

  const handleSelectContact = async (contact) => {
    const alreadyExists = selectedContacts.some((c) => c.id === contact.id);
    if (alreadyExists) {
      alert("This contact is already added.");
      return;
    }

    let fullContact = contact;

    if (contact.imageAvailable) {
      try {
        const fetched = await Contacts.getContactByIdAsync(contact.id);
        if (fetched.image) {
          fullContact = fetched;
        }
      } catch (error) {
        console.warn("Error fetching image:", error);
      }
    }

    const newContact = { ...fullContact, category: "family" }; // Default value for badge

    setSelectedContacts((prev) => {
      const updated = [...prev, newContact];
      saveContacts(updated);
      return updated;
    });

    setShowModal(false);
  };

  const getBadgeStyle = (category) => {
    switch (category) {
      case "family":
        return { backgroundColor: "#4dabf5" };
      case "friends":
        return { backgroundColor: "#66bb6a" };
      case "authority":
        return { backgroundColor: "#ef5350" };
      default:
        return { backgroundColor: "#aaa" };
    }
  };

  const filteredContacts = phoneContacts.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const callContact = (contact) => {
    const number = contact.phoneNumbers?.[0]?.number;
    if (number) {
      Linking.openURL(`tel:${number}`);
    } else {
      alert("This contact has no phone number");
    }
  };

  const saveContacts = async (contacts) => {
    try {
      await AsyncStorage.setItem("saved_contacts", JSON.stringify(contacts));
    } catch (error) {
      console.log("Saving contacts failed", error);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await AsyncStorage.getItem("saved_contacts");
      if (!data) return [];

      const parsed = JSON.parse(data);

      // Ensure each contact has a category
      const updated = parsed.map((c) => ({
        ...c,
        category: c.category || "family", // or null if you want no default
      }));

      return updated;
    } catch (error) {
      console.log("Loading contacts failed", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchSaved = async () => {
      const stored = await loadContacts();
      setSelectedContacts(stored);
      saveContacts(stored); // update AsyncStorage with categories
    };
    fetchSaved();
  }, []);

  useEffect(() => {
    const fetchSaved = async () => {
      const stored = await loadContacts();
      setSelectedContacts(stored);
    };
    fetchSaved();
  }, []);
  const handleConfirmDelete = () => {
    const updated = selectedContacts.filter((c) => c.id !== contactToDelete.id);
    setSelectedContacts(updated);
    saveContacts(updated);
    setContactToDelete(null);
  };

  const isEmpty = selectedContacts.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <View style={styles.container}>
        {isEmpty ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require("../../assets/empty_placeholder.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.placeholderText}>
              No emergency contacts added yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={selectedContacts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.contactInfo}>
                  {/* Contact Image */}
                  {item.imageAvailable && item.image ? (
                    <Image
                      source={{ uri: item.image.uri }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarInitial}>
                        {item.name?.charAt(0).toUpperCase() || "?"}
                      </Text>
                    </View>
                  )}

                  {/* Name & Phone */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>
                      {item.phoneNumbers?.[0]?.number || "No number"}
                    </Text>
                  </View>
                  {/* {item.category && ( */}
                  <View style={[styles.badge, getBadgeStyle(item.category)]}>
                    <Text style={styles.badgeText}>{item.category}</Text>
                  </View>
                  {/* // )} */}

                  {/* Call Icon */}
                  <TouchableOpacity onPress={() => callContact(item)}>
                    <Ionicons name="call" size={24} color="#FF4A4D" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {/* Floating + Button */}
        <TouchableOpacity style={styles.fab} onPress={handleAddContact}>
          <Ionicons name="add" size={45} color="#fff" />
        </TouchableOpacity>

        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Select a Contact</Text>

              <TextInput
                placeholder="Search contacts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholderTextColor="#aaa"
              />

              <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.contactCard}
                    onPress={() => handleSelectContact(item)}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>
                      {item.phoneNumbers[0]?.number || "No number"}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <Text style={styles.noMatch}>
                    No matching contacts found.
                  </Text>
                }
              />

              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {contactToDelete && (
          <View style={styles.overlay}>
            <BlurView
              intensity={60}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.confirmBox}>
              <Text style={{ fontSize: 16, marginBottom: 20, color: "#555" }}>
                {contactToDelete.name}
                {"\n"}
                {contactToDelete.phoneNumbers?.[0]?.number || "No number"}
              </Text>
              <Text style={styles.confirmText}>Delete this contact?</Text>
              <View style={styles.confirmBtns}>
                <TouchableOpacity
                  style={styles.yesBtn}
                  onPress={handleConfirmDelete}
                >
                  <Text style={styles.btnText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setContactToDelete(null)}
                  style={styles.noBtn}
                >
                  <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FF4A4D",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  closeBtn: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  closeText: {
    color: "#FF4A4D",
    fontWeight: "bold",
  },
  noMatch: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  confirmBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  confirmText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  confirmBtns: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },

  yesBtn: {
    backgroundColor: "#FF4A4D",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  noBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  phone: {
    fontSize: 14,
    color: "#777",
  },
  badge: {
    backgroundColor: "#aaa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
