import { Text } from "react-native";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";

export default function ResponderLocation() {
  return (
    <SafeAreaWrapper>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Responder Live Location
      </Text>
      {/* Map integration will go here */}
    </SafeAreaWrapper>
  );
}
