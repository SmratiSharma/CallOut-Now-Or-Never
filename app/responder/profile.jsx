import { Text } from "react-native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";

export default function ResponderProfile() {
  return (
    <SafeAreaWrapper>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Responder Profile Page
      </Text>
      {/* We'll add user info, history, and settings here */}
    </SafeAreaWrapper>
  );
}
