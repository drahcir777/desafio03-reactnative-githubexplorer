import { useNavigation } from "@react-navigation/core";
import React, { useRef, useState } from "react";
import { Alert, TextInput } from "react-native";

import { Background } from "../../components/Background";
import { Card } from "../../components/Card";

import { useRepositories } from "../../hooks/useRepositories";

import {
  AddGithubRepo,
  Container,
  Icon,
  Input,
  InputButton,
  InputField,
  RepositoriesList,
  Title,
} from "./styles";

export function Dashboard() {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const { navigate } = useNavigation();

  const { addRepository, repositories } = useRepositories();

  function handleAddRepository() {
    /**
     * TODO:
     * - call addRepository function sending inputText value;
     * - clean inputText value.
     */
    try {
      addRepository(inputText);
      inputRef.current?.blur();
      setInputText("");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu algum erro no servidor, tente novamente.");
    }
  }

  function handleRepositoryPageNavigation(id: number) {
    /**
     * TODO - navigate to the Repository screen sending repository id.
     * Remember to use the correct prop name (repositoryId) to the repositoy id:
     *
     * navigate(SCREEN NAME, {
     *  repositoryId: id of the repository
     * })
     */
    navigate("Repository", {
      repositoryId: id,
    });
  }

  return (
    <Background>
      <Container>
        <AddGithubRepo>
          <Title>Explore repositórios{"\n"}no GitHub.</Title>

          <Input>
            <InputField
              ref={inputRef}
              placeholder="Digite aqui 'usuário/repositório'"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleAddRepository}
              returnKeyType="send"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputButton
              testID="input-button"
              onPress={handleAddRepository}
              disabled={inputText === ""}
            >
              <Icon name="search" size={20} />
            </InputButton>
          </Input>
        </AddGithubRepo>

        <RepositoriesList
          data={repositories}
          showsVerticalScrollIndicator={false}
          keyExtractor={(repository) => String(repository.id)}
          renderItem={({ item: repository }) => (
            <Card
              key={repository.id}
              data={{
                id: repository.id,
                title: repository.full_name,
                subTitle: repository.description,
                imageUrl: repository.owner.avatar_url,
              }}
              onPress={() => handleRepositoryPageNavigation(repository.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}
