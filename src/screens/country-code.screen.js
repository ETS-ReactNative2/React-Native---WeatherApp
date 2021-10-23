import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import {
  DataTable,
  Searchbar,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import WebView from "react-native-webview";
import { countriesData } from "../../assets/data/countriesData";

// const CustomView = () => {
//   return (
//     <View style={{ backgroundColor: "red" }}>
//       <WebView
//         style={{ height: 33, width: 50 }}
//         source={{ uri: "https://flagcdn.com/w320/in.png" }}
//       />
//     </View>
//   );
// };

const CountryCodeScreen = () => {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchedCountry, setSearchedCountry] = useState([]);
  const [error, setError] = useState(null);

  const getCountriesData = () => {
    setError(null);
    setCountries(countriesData);
  };

  const filteredCountry = (input) => {
    setError(null);
    setKeyword(input);
    const country = countries.filter((c) =>
      c.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchedCountry(country);
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  if (!countries.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="medium" />
      </View>
    );
  }

  return (
    <View style={{ margin: 20 }}>
      {/* Searchbar */}
      <Searchbar
        placeholder="Search..."
        value={keyword}
        onChangeText={(text) => filteredCountry(text)}
      />
      {/* Error Case */}
      {error ? (
        <Text
          style={{
            marginBottom: 20,
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(202, 39, 7, 0.8)",
          }}
        >
          {error}
        </Text>
      ) : (
        <Text
          style={{
            marginBottom: 10,
            textAlign: "center",
            color: "white",
          }}
        ></Text>
      )}

      <Text style={{ textAlign: "right" }}>
        Total:{" "}
        {searchedCountry.length ? searchedCountry.length : countries.length}
      </Text>
      {/* Table */}
      <DataTable style={{ borderWidth: 1, borderColor: "gray" }}>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={{ fontSize: 16 }}>Country Code</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>Country</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 18 }}>Flag</Text>
          </DataTable.Title>
        </DataTable.Header>

        {countries && countries.length > 0 && (
          <FlatList
            // data={countries}
            data={searchedCountry.length ? searchedCountry : countries}
            keyExtractor={(data) => data.code}
            renderItem={({ item }) => {
              return (
                <DataTable.Row style={{ height: 100, paddingHorizontal: 20 }}>
                  <DataTable.Cell>
                    <Text style={{ fontSize: 22 }}>{item.code}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "red" }}>
                      <Image
                        style={{ height: 50, width: 80 }}
                        source={item.image}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            }}
          />
        )}
      </DataTable>
    </View>
  );
};

export default CountryCodeScreen;
