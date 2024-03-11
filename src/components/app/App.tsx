import React, { useState } from "react";
import { AppRoot, View, Panel } from "@vkontakte/vkui";
import FirstPage from "../pages/first-page/first-page";
import SecondPage from "../pages/second-task/second-page";
import "@vkontakte/vkui/dist/vkui.css";

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
