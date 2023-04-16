import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import callbackImage from "./assets/callback.png";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = () => {
    const randomId = Math.floor(Math.random() * 560000) + 1;
    const url = `https://api.themoviedb.org/3/movie/${randomId}?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

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
      })
      .catch((error) => console.error(error));
  };
  console.log(data);

  return (
    <View style={styles.container}>
      <Text>Hello World! 4</Text>
      <Text>{data.originalTitle}</Text>
      <Text>{data && data.budget}</Text>
      <Image
        source={
          data && data.image
            ? { uri: "https://image.tmdb.org/t/p/original" + data.image }
            : callbackImage
        }
      />
      <StatusBar style="auto" />
      <Button
        title="Verificar"
        size="lg"
        colorScheme="purple"
        mt="24px"
        onPress={apiCall}
      />
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
});
