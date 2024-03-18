import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardTile from "../components/CardTile";

export default DetailsScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [detailsData, setDetailsData] = useState(null);
  const { params } = route;
  const { id } = params;

  useEffect(() => {
    if (id) {
      async function getMoviesDetailsById() {
        const apiRes = await fetch(
          `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "e9b4852aecmsh7ce096eff5f970ep1172ecjsnbb81d0852fad",
              "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
            },
          }
        );
        const result = await apiRes.json();
        if (result) {
          setDetailsData(result);
          setLoading(false);
        }
      }
      getMoviesDetailsById();
    }
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator size={"large"} color={"blue"} style={{ flex: 1 }} />
    );
  }
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <CardTile isDetailsPage={true} item={detailsData} />
      <StatusBar style="light" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
