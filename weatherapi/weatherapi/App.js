import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

// You can import from local files

const rainy = require('./icons8-rain-48.png');

const degres = require('./icon.png');
const time = new Date();
let month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let day = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let mins = time.getMinutes();
let dispMins = mins < 10 ? '0' + mins : mins;
let hours = time.getHours() % 12;
let dispHours = hours < 10 ? '0' + hours : hours;
let ampm = time.getHours() >= 12 ? 'pm' : 'am';
let months = time.getMonth();
let days = time.getDay();
let date = time.getDate();

const API_key = '0a7963f23613fedfb26853f28148c6c2';

export default function App() {
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [sunR, setSunR] = useState('');
  const [Sunset, setSunset] = useState('');
  const [Pressure, setPressure] = useState('');
  const [Nam, setNam] = useState({
    cname: '',
    country: '',
  });
  const [Humidity, setHumidity] = useState('');
  const [icon, setIcon] = useState({
    icon: '',
    descrip: '',
  });
  console.log(icon.icon, icon.descrip);
  //days state

  const [sunday, setSunday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });

  const [tuesday, setTuesday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });
  const [wednesday, setWednesday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });
  const [thursday, setThursday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });
  const [friday, setFriday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });
  const [saturday, setSaturday] = useState({
    temp: '',
    sunset: '',
    sunrise: '',
    humidity: '',
  });
  const [monday, setMonday] = useState({ temp: '', sunset: '', sunrise: '' });
  //conditions
  const degres = temp == '' ? '' : '°C';
  const sunny =
    temp > 20
      ? require('./icons8-sunny-64.png')
      : require('./icons8-rain-48.png');
  const img =
    temp >= 20 ? require('./kuyashisa.jpg') : require('./fewClouds.jpg');
  //fetching data
  function fetchWeather() {
    const API = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${search}&appid=${API_key}`;
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        let { name } = data;
        let { country } = data.sys;
        setNam({
          cname: name,
          country: country,
        });
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_key}`
        )
          .then((res) => res.json())
          .then((data) => {console.log(data);
            veza(data);
          });
      });
  }


  //icon
  const ico = `http://openweathermap.org/img/wn/${icon.icon}@2x.png`;
  //icon
//daily data
  function dataday() {
    navigator.geolocation.getCurrentPosition((lana) => {
      const { latitude, longitude } = lana.coords;
      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_key}`;
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
         
          let latitude = data.coord.lat;
          let longitude = data.coord.lon;
          let { name } = data;
          let { country } = data.sys;
          setNam({
            cname: name,
            country: country,
          });
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_key}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              veza(data);
            });
        });
    });
  }
  const veza = (data) => {
    let { sunrise, sunset } = data.daily[0];
    let { icon, description } = data.daily[0].weather[0];
    let { temp } = data.current;
    let { humidity, wind_speed, pressure } = data.current;
    
    
    setSunday({
      temp:data.daily[0].temp.day,
      sunrise:data.daily[0].sunrise,
      sunset:data.daily[0].sunset,
      humidity:data.daily[0].humidity,
    })
     setMonday({
      temp:data.daily[1].temp.day,
      sunrise:data.daily[1].sunrise,
      sunset:data.daily[1].sunset,
      humidity:data.daily[1].humidity,
    })
     setTuesday({
      temp:data.daily[2].temp.day,
      sunrise:data.daily[2].sunrise,
      sunset:data.daily[2].sunset,
      humidity:data.daily[2].humidity,
    })
     setWednesday({
      temp:data.daily[3].temp.day,
      sunrise:data.daily[3].sunrise,
      sunset:data.daily[3].sunset,
      humidity:data.daily[3].humidity,
    })
     setThursday({
      temp:data.daily[4].temp.day,
      sunrise:data.daily[4].sunrise,
      sunset:data.daily[4].sunset,
      humidity:data.daily[4].humidity,
    })
     setFriday({
      temp:data.daily[5].temp.day,
      sunrise:data.daily[5].sunrise,
      sunset:data.daily[5].sunset,
      humidity:data.daily[5].humidity,
    })
     setSaturday({
      temp:data.daily[6].temp.day,
      sunrise:data.daily[6].sunrise,
      sunset:data.daily[6].sunset,
      humidity:data.daily[6].humidity,
    })
    setSunset(sunset);
    setSunR(sunrise);
    setTemp(temp);
    setIcon({
      icon: icon,
      descrip: description,
    });
    setWind(wind_speed);
    setHumidity(humidity);
    setPressure(pressure);
  };
  // fetching data
  useEffect(() => {
    dataday();
  }, []);

  const display = (data) => {
    let { temp } = data.main;
    let { pressure } = data.main;
    let { humidity } = data.main;
    let { speed } = data.wind;
    let { sunrise } = data.sys;
    let { sunset } = data.sys;
    let { name } = data;
    setTemp(temp);
    setNam(name);
    setSunR(sunrise);
    setWind(speed);
    setSunset(sunset);
    setHumidity(humidity);
    setPressure(pressure);
    setIcon(icon);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.back}>
        <View style={styles.vie}>
          <TextInput
            style={styles.txt}
            placeholder="search by city"
            value={search}
            onChangeText={(search) => setSearch(search)}
          />
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ marginTop: 4 }}
            onPress={() => fetchWeather()}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 31, fontWeight: 'bolder', color: 'white' }}>
            
            {Nam.cname}, {Nam.country}
          </Text>
          <Text style={{ fontSize: 28, color: 'white', marginVertical: 5 }}>
            {hours}:{dispMins} {ampm}
          </Text>
          <Text style={{ fontSize: 23, color: 'white' }}>
            {day[days]}, {date} {month[months]}
          </Text>
          <Text
            style={{
              fontSize: 31,
              fontWeight: 'bold',
              color: 'white',
              paddingTop: 10,
            }}>
            {temp}
            {degres}
          </Text>
          <Text style={{ color: 'white' }}>{icon.descrip}</Text>
          <img src={ico} style={{ width: 40, height: 40, marginBottom: 10 }} />
        </View>
        <View style={{ flexDirection: 'row' ,alignSelf:'center'}}>
          <View style={styles.box}>
            <Text style={{ fontWeight: 'bold' }}>Humidity :{Humidity}</Text>
            <Text style={{ fontWeight: 'bold' }}>Sunset :{Sunset}</Text>
            <Text style={{ fontWeight: 'bold' }}>Pressure :{Pressure}</Text>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: 'bold' }}>Windspeed :{wind}</Text>
            <Text style={{ fontWeight: 'bold' }}>Sunrise :{sunR}</Text>
            <Text style={{ fontWeight: 'bold' }}>Temperature :{temp}</Text>
          </View>
        </View>
        <ScrollView horizontal="true" style={{ marginTop: 80 }}>
          <View style={styles.scroll}>
            <Text>Sunday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{sunday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{sunday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{sunday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{sunday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
           <Text> Monday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{monday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{monday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{monday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{monday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
            <Text>Tuesday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{tuesday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{tuesday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{tuesday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{tuesday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
            <Text>Wednesday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{wednesday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{wednesday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{wednesday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{wednesday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
            <Text>Thursday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{thursday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{thursday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{thursday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{thursday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
           <Text>Friday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{friday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{friday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{friday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{friday.humidity}
            </Text>
          </View>
          <View style={styles.scroll}>
            <Text>Saturday</Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Temperature:{saturday.temp}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunrise:{saturday.sunrise}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Sunset:{saturday.sunset}
            </Text>
            <Text style={{ fontWeight: 600, color: 'blue' }}>
              Humidity:{saturday.humidity}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    justifyContent:'space-between',
    alignItems:'center',
    height: 140,
    width: 150,
    backgroundColor: '',
    opacity: 0.7,
    borderWidth: 3,
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
  },
  vie: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 20,
  },
  box: {
    height: 150,
    width: 140,
    backgroundColor: 'white',
    opacity: 0.5,
    marginHorizontal: 18,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
  },
  txt: {
    outline: 'none',
    width: '83%',
    height: 35,
    backgroundColor: 'white',
    marginLeft: 20,
  },

  back: {
    flex: 1,
    resizeMode: 'cover',
  },
});
