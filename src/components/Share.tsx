import React, { useEffect, useState } from "react";
// import { Button, Image, Text, View } from "react-native";
import { Button, NativeModules, Text, View } from "react-native";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ShareData, ShareMenuReactView } from "react-native-share-menu";


const Share = () => {
    const [sharedData, setSharedData] = useState<string | string[]>();
    const [sharedMimeType, setSharedMimeType] = useState<string | string[]>();
    useEffect(() => {
      (ShareMenuReactView).data().then(({data, mimeType}) => {
        setSharedData(data);
        setSharedMimeType(mimeType);
        // text/plain
        // image/jpeg
      });
    }, []);


    return (
      <View>
          <Text>
              {/* {sharedMimeType} */}
          </Text>
          <Button
          title="Dismiss"
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}
        />
        <Button
          title="Send"
          onPress={() => {
            // Share something before dismissing
            ShareMenuReactView.dismissExtension();
          }}
        />
        <Button
          title="Dismiss with Error"
          onPress={() => {
            ShareMenuReactView.dismissExtension("Something went wrong!");
          }}
        />
        <Button
          title="Continue In App"
          onPress={() => {
            ShareMenuReactView.continueInApp();
          }}
        />
        <Button
          title="Continue In App With Extra Data"
          onPress={() => {
            ShareMenuReactView.continueInApp({ hello: "from the other side" });
          }}
        />

        {/* {sharedMimeType === "text/plain" && <Text>{sharedData}</Text>}
        {sharedMimeType.startsWith("image/") && (
          <Image source={{ uri: sharedData }} />
        ) */}
      </View>
    );
  };

export default Share; 