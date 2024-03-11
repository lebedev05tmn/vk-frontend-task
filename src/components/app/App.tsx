import React, { useState } from "react";
import { AppRoot, View } from "@vkontakte/vkui";
import FirstPage from "../pages/first-page/first-page";
import SecondPage from "../pages/second-task/second-page";
import bridge from "@vkontakte/vk-bridge";
import "@vkontakte/vkui/dist/vkui.css";

bridge.send("VKWebAppInit");

const App: React.FC = () => {
  const [activePanelPage, setActivePanelPage] = useState<string>("main");
  return (
    <AppRoot>
      <View activePanel={activePanelPage}>
        <FirstPage id="main" setActivePanelPage={setActivePanelPage} />
        <SecondPage id="second" setActivePanelPage={setActivePanelPage} />
      </View>
    </AppRoot>
  );
};

export default App;
