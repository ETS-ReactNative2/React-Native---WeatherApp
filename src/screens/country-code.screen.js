import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { DataTable, Searchbar, ActivityIndicator } from "react-native-paper";
import { countriesData } from "../../assets/data/countriesData";

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
    <View style={styles.viewContainer}>
      {/* Searchbar */}
      <Searchbar
        placeholder="Search..."
        value={keyword}
        onChangeText={(text) => filteredCountry(text)}
      />
      {/* Error Case */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text
          style={{
            marginBottom: 20,
            textAlign: "center",
            color: "white",
          }}
        ></Text>
      )}

      <Text style={styles.totalText}>
        Total:{" "}
        {searchedCountry.length ? searchedCountry.length : countries.length}
      </Text>
      {/* Table */}
      <DataTable style={styles.tableContainer}>
        <DataTable.Header>
          <DataTable.Title>
            <Text style={styles.tableHeaderTitle1}>Country Code</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            <Text style={styles.tableHeaderTitle2}>Country</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: "flex-end" }}>
            <Text style={styles.tableHeaderTitle3}>Flag</Text>
          </DataTable.Title>
        </DataTable.Header>

        {countries && countries.length > 0 && (
          <FlatList
            // data={countries}
            data={searchedCountry.length ? searchedCountry : countries}
            keyExtractor={(data) => data.code}
            renderItem={({ item }) => {
              return (
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell>
                    <Text style={styles.tableCell1}>{item.code}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell2}>
                    <Text style={styles.tableCell2Text}>{item.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell3}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.imageProp} source={item.image} />
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

const styles = StyleSheet.create({
  viewContainer: {
    margin: 20,
  },
  errorText: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(202, 39, 7, 0.8)",
  },
  totalText: {
    textAlign: "right",
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "gray",
  },
  tableHeaderTitle1: {
    fontSize: 16,
  },
  tableHeaderTitle2: {
    fontSize: 18,
  },
  tableHeaderTitle3: {
    fontSize: 18,
  },
  tableRow: {
    height: 100,
    paddingHorizontal: 20,
  },
  tableCell1: {
    fontSize: 22,
  },
  tableCell2: {
    justifyContent: "center",
  },
  tableCell2Text: {
    fontSize: 18,
  },
  tableCell3: {
    justifyContent: "flex-end",
  },
  imageContainer: {
    backgroundColor: "red",
  },
  imageProp: {
    height: 50,
    width: 80,
  },
});

export default CountryCodeScreen;
