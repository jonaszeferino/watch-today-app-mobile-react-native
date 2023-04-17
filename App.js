import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Button, StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import { useEffect, useState } from "react";
import callbackImage from "./assets/callback.png";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showCallbackImage, setShowCallbackImage] = useState(true);

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
            (result.genres && result.genres.map((genre) => genre.name)) || null,
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

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#4d33ef"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "What to watch today?",
          style: { color: "#fff" },
        }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
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
      {data && (
        <>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.header}>Title </Text>
              <Text>{data.originalTitle}</Text>
            </View>
          </View>
          <Image
            style={{ height: 504, width: 336 }}
            source={{ uri: imageUrl }}
          />
          {data.popularity && (
            <View style={styles.row}>
              <Text style={styles.header}>Popularity </Text>
              <Text>{data.popularity}</Text>
            </View>
          )}
          {data.ratingCount && (
            <View style={styles.row}>
              <Text style={styles.header}>Rating </Text>
              <Text>{data.ratingCount}</Text>
            </View>
          )}
          {data.budget && (
            <View style={styles.row}>
              <Text style={styles.header}>Budget </Text>
              <Text>{data.budget}</Text>
            </View>
          )}
        </>
      )}
      <StatusBar style="auto" />
      {data || isError ? (
        <Button
          title="Novo Filme"
          size="lg"
          colorScheme="purple"
          mt="24px"
          onPress={apiCall}
        />
      ) : (
        <Button
          title="Verificar"
          size="lg"
          colorScheme="purple"
          mt="24px"
          onPress={apiCall}
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
  },
  table: {
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontWeight: "bold",
  },
});
