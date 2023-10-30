import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";

export default function MovieRating({ movieData, onClose }) {
  const [userRating, setUserRating] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmitRating = () => {
    fetch(
      "https://supabase-nextjs-gamma.vercel.app/api/v1/postRateRandomMovie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movieData.movieId,
          poster_path: movieData.image,
          original_title: movieData.originalTitle,
          vote_average_by_provider: movieData.average,
          rating_by_user: userRating,
          portuguese_title: movieData.portugueseTitle,
          user_email: userEmail,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Avaliação enviada com sucesso:", result);
      })
      .catch((error) => {
        console.error("Erro ao enviar avaliação:", error);
      });

    onClose();
  };

  return (
    <View>
      <Text> Avalie o filme: {movieData.originalTitle} </Text>
      <TextInput
        placeholder="Sua avaliação (0-10)"
        value={userRating}
        onChangeText={(text) => setUserRating(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Seu e-mail"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
      />
      <Button title="Enviar Avaliação" onPress={handleSubmitRating} />
    </View>
  );
}
