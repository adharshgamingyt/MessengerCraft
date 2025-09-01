import { Text, View } from "react-native";
import { Hellow } from "@workspace/mobile-package";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{Hellow}</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
