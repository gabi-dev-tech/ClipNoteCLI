import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 32, 
    fontWeight: 'bold'
  },
  cardContainer: {
    borderWidth: 1, 
    borderColor: 'gray', 
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.25,
    shadowRadius: 3.48, 
    elevation: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  labels: {
    fontSize: 12, 
    color: 'gray'
  },
  containerLista: {
    width: 370,
    gap: 20
  }, 
  headCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    padding: 4
  },
  bodyCard: {
    gap: 4,
    padding: 4
  }
});