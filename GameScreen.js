import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { seconds } = route.params;
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (gameStarted) {

      setTimeout(() => {
        if (gameStarted && timeLeft > 0) {
          console.log(Date.now() - startTime, Date.now(), startTime);
          setTimeLeft(Number(seconds - Number(((Date.now() - startTime) / 1000).toFixed(1))).toFixed(1));
        } else if (timeLeft <= 0) {
          setGameStarted(false);
          setTaps(0);
          // Navigate to Result Screen
          navigation.navigate('Result', { cps: taps / seconds, seconds });
        }
      }, 100);
    }
  }, [timeLeft, gameStarted]);

  const handleTap = () => {
    if (!gameStarted) {
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(seconds);
    setTaps(0);
  } else setTaps(taps + 1);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap as many times as you can!</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{timeLeft}</Text>
        <Text style={styles.timerLabel}>Seconds Left</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Taps:</Text>
        <Text style={styles.resultCount}>{taps}</Text>

      </View>
      { gameStarted && taps > 0 ?
      <Text style={styles.resultLabel}>CPS: {(taps / (seconds-timeLeft)).toFixed(1)}</Text>
      : null }
      <TouchableOpacity style={gameStarted ? styles.tapButton : [styles.tapButton, {backgroundColor: '#234F1E'}]} onPress={handleTap}>
        <Text style={styles.tapButtonText}>{gameStarted ? 'Tap!' : 'Start!'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tapButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    height: Dimensions.get('window').height - 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resultCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});