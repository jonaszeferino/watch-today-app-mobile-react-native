import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button as ButtonTest, ButtonText, ButtonIcon } from "@gluestack-ui/themed";

import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import { useEffect, useState } from "react";
import callbackImage from "./assets/callback_gray.png";
import MovieRating from "./components/rating";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showCallbackImage, setShowCallbackImage] = useState(true);

  const [showRatingModal, setShowRatingModal] = useState(false);

  const apiCall = () => {
    setIsLoading(true);
    setIsError(false);
    setShowCallbackImage(true);

    const randomId = Math.floor(Math.random() * 560000) + 1;
    const url = `https://api.themoviedb.org/3/movie/${randomId.toString()}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData({
          budget: result.budget || null,
          originalTitle: result.original_title || null,
          portugueseTitle: result.title || null,
          overview: result.overview || null,
          average: result.vote_average || null,
          releaseDate: result.release_date || null,
          image: result.poster_path || null,
          ratingCount: result.vote_count || null,
          popularity: result.popularity || null,
          gender:
            (result.genres && result.genres.map((genre) => genre.name)) || [],

          languages:
            (result.spoken_languages && result.spoken_languages[0].name) ||
            null,
          adult: result.adult || null,
          movieId: result.id || null,
          originalLanguage: result.original_language || null,
          statusMovie: result.status || null,
        });
        setIsLoading(false);
        setShowCallbackImage(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setShowCallbackImage(true);
      });
  };
  console.log(data);

  const imageUrl = data?.image
    ? `https://image.tmdb.org/t/p/original${data.image}`
    : callbackImage;

    let AddIcon

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#4d33ef"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "What To Watch Today?",
          style: { color: "#fff" },
        }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <ScrollView style={styles.contentContainer}>


        {data ? (
          <>
            {(isError || (!isLoading && !data)) && (
              <View style={styles.callbackContainer}>
                <Image source={callbackImage} style={styles.callbackImage} />
                {isError && (
                  <Text style={styles.errorText}>
                    Ocorreu um erro ao carregar os dados
                  </Text>
                )}
              </View>
            )}
          </>
        ) : (
          <Text>Clique no Botão Abaixo para ter uma sugestão de filme</Text>
        )}

        {data && !isError && (
          <>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.header}>Título</Text>
                <Text>{data.originalTitle}</Text>
              </View>
            </View>
            <Image
              style={{ height: 504, width: 336 }}
              source={{ uri: imageUrl }}
            />
            {data.popularity && (
              <View style={styles.row}>
                <Text style={styles.header}>Nota </Text>
                <Text>{data.popularity}</Text>
              </View>
            )}
          </>
        )}
        <StatusBar style="auto" />
        {data || isError ? (
          <TouchableOpacity style={styles.button} onPress={apiCall}>
            <Text style={styles.buttonText}>Novo Filme</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={apiCall}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowRatingModal(true)}
        >
          <Text style={styles.buttonText}>Avaliar</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
      {showRatingModal && (
        <MovieRating
          movieData={data}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  contentContainer: {
    flexGrow: 1,
  },
  table: {
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontWeight: "bold",
  },
  callbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  callbackImage: {
    width: 336,
    height: 504,
  },
  errorText: {
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
