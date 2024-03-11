import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Header,
  FormItem,
  FormLayoutGroup,
  Input,
  Card,
  Spinner,
  Div,
} from "@vkontakte/vkui";

type Props = {
  id: string;
  setActivePanelPage: (activePanel: string) => void;
};

const SecondPage: React.FC<Props> = ({ id, setActivePanelPage }) => {
  const [nameValue, setNameValue] = useState<string>("");
  const [debouncedValue] = useDebounce(nameValue, 500);
  const [ageValue, setAgeValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAge = async (name: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const result = await response.json();
      const age = result.age;
      setAgeValue(age);
    } catch (error) {
      setError("Произошла ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      fetchAge(debouncedValue);
    }
  }, [debouncedValue]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(false);
    setAgeValue(0);
    setError("");
    setNameValue(e.target.value);
  };

  const handleSubmit = () => {
    if (nameValue.match(/^[a-zA-Z]|/)) {
      fetchAge(nameValue);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>
        <Button
          onClick={() => setActivePanelPage("main")}
          stretched
          mode="primary"
          style={{ width: "20%" }}>
          Задание 1
        </Button>
      </PanelHeader>
      <Group mode="card" header={<Header mode="secondary">Задание 2</Header>}>
        <FormLayoutGroup>
          <FormItem htmlFor="input-name" top="Введите своё имя">
            <Input id="input-name" type="text" onChange={handleNameChange} />
          </FormItem>
          <FormItem>
            <Button onClick={handleSubmit}>Отправить запрос</Button>
          </FormItem>
        </FormLayoutGroup>
        {isLoading && <Spinner size="large" />}
        {error && <Div style={{ color: "red" }}>{error}</Div>}
        {ageValue > 0 && <Card>{ageValue}</Card>}
      </Group>
    </Panel>
  );
};

export default SecondPage;
