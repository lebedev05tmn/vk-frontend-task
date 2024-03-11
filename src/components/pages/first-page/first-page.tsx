import React, { useState, useRef, useEffect } from "react";
import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Textarea,
  FormItem,
  Header,
} from "@vkontakte/vkui";

type Props = {
  id: string;
  setActivePanelPage: (activePanel: string) => void;
};

const FirstPage: React.FC<Props> = ({ id, setActivePanelPage }) => {
  const [areaValue, setAreaValue] = useState<string>("");
  const [numberOfFocus, setNumberOfFocus] = useState<number>(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Произошла ошибка при загрузке данных");
      }
      const result = await response.json();
      const textFact = result.fact;
      setAreaValue(textFact);
      textRef.current?.focus();
      setNumberOfFocus(textFact.split(" ")[0].length);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    textRef.current &&
      textRef.current.setSelectionRange(numberOfFocus, numberOfFocus);
  }, [numberOfFocus]);

  return (
    <Panel id={id}>
      <PanelHeader>
        <Button
          onClick={() => setActivePanelPage("second")}
          stretched
          mode="primary"
          style={{ width: `10%` }}>
          Задание 2
        </Button>
      </PanelHeader>
      <Group mode="card" header={<Header mode="secondary">Задание 1</Header>}>
        <FormItem>
          <Textarea
            name="textarea"
            id="textarea"
            cols={100}
            rows={100}
            getRef={textRef}
            value={areaValue}
            onChange={e => setAreaValue(e.target.value)}
          />
        </FormItem>
        <Button
          stretched
          mode="secondary"
          size="m"
          onClick={handleClick}
          style={{ height: 50 }}>
          {isLoading ? "Загрузка..." : "Отправить запрос"}
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Group>
    </Panel>
  );
};

export default FirstPage;
