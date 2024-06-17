import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { WebView } from 'react-native-webview';
import { buscarVideos } from './youtube';

export default function App() {
  const [pesquisa, setpesquisa] = useState('');
  const [videos, setVideos] = useState([]);

  const pesquisar = async () => {
    try {
      const resultados = await buscarVideos(pesquisa);
      setVideos(resultados);
    } catch (erro) {
      console.error('Erro ao pesquisar vídeos:', erro);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.container}>
      <ScrollView style={estilos.scrollView}>
        {videos.map(video => (
          <View key={video.id.videoId} style={estilos.containerVideo}>
            <Text style={estilos.tituloVideo}>{video.snippet.title}</Text>
            <WebView
              style={estilos.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ html: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>` }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={estilos.containerPesquisa}>
        <TextInput
          style={estilos.entrada}
          placeholder="Digite sua pesquisa"
          value={pesquisa}
          onChangeText={setpesquisa}
        />
        <TouchableOpacity style={estilos.botao} onPress={pesquisar}>
          <Text style={estilos.textoBotao}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  entrada: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  containerVideo: {
    marginBottom: 20,
  },
  tituloVideo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webview: {
    height: 200,
  },
});
