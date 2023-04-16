import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = () => {
    const url = `https://api.themoviedb.org/3/movie/123?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData({
          budget: result.budget,
          originalTitle: result.original_title,
          portugueseTitle: result.title,
          overview: result.overview,
          average: result.vote_average,
          releaseDate: result.release_date,
          image: result.poster_path,
          country: result.production_countries[0].name,
          ratingCount: result.vote_count,
          popularity: result.popularity,
          gender: result.genres.map((genre) => genre.name),
          languages: result.spoken_languages[0].name,
          adult: result.adult,
          movieId: result.id,
          originalLanguage: result.original_language,
          statusMovie: result.status,
        });
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };
  console.log(data);

  return (
    <View style={styles.container}>
      <Text>Hello World! 4</Text>
      <Text>{data && data.originalTitle}</Text>
      <Text>{data && data.budget}</Text>
      <Text>{data && data.releaseDate}</Text>
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
