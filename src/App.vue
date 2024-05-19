<script>
import axios from 'axios';
import City from './components/City.vue';
import User from "./components/User.vue";
import Weather from "./components/Weather.vue";
import WeatherAdmin from './components/WeatherAdmin.vue';
export default {
    components: { Weather, User, WeatherAdmin, City },
    data() {
        return {
            cityName: '',
            userName: '',
            users: [],
            weather: null,
            weathers: [],
            fiveDaysWeather: [],
            cities: [],
            selectedUser: 'none',
            errorAdd: null,
            goodAdd: false,
            errorChange: null,
            goodChange: false,
            errorGet: null,
            category: '',
            temp: null,
            pressure: null,
            humidity: null,
            speed: null,
            deg: null,
            clouds: null,
            date: '',
            weatherType: { "description": '', "icon": '' },
            cityId: null,
            userCities: [],
            good1: false,
            good5: false
        }
    },
    methods: {
        getWeather() {
            axios.get(`http://localhost:8080/api/v1/weather/curr?city=${this.cityName}`)
                .then((res) => {
                    this.weather = res.data
                })
                .catch(error => {
                    this.errorGet = error
                    setTimeout(() => {
                        this.errorGet = null
                    }, 3000)
                })
            axios.get(`http://localhost:8080/api/v1/weather/days?city=${this.cityName}`)
                .then((res) => { this.fiveDaysWeather = res.data })
        },
        getWeathers() {
            axios.get("http://localhost:8080/api/v2/weather/all/sorted")
                .then((res) => {
                    this.weathers = res.data
                })
        },
        addWeather() {
            axios.post("http://localhost:8080/api/v2/weather/", {
                "temp": this.temp,
                "pressure": this.pressure,
                "humidity": this.humidity,
                "speed": this.speed,
                "deg": this.deg,
                "clouds": this.clouds,
                "date": {
                    "day": this.date.slice(8, 10),
                    "month": this.date.slice(5, 7),
                    "year": this.date.slice(0, 4)
                },
                "cityId": this.cityId,
                "weatherDescription": this.weatherType.description,
                "weatherIcon": this.weatherType.icon
            })
                .then((res) => {
                    this.weathers.push(res.data)
                    console.log(res.data);
                    this.goodAdd = true
                    setTimeout(() => {
                        this.goodAdd = false
                    }, 3000)
                })
                .catch((error) => {
                    this.errorAdd = error
                    setTimeout(() => {
                        this.errorAdd = null
                    }, 3000)
                })
        },
        deleteWeather(index, id) {
            axios.delete(`http://localhost:8080/api/v2/weather/${id}`)
                .then(() => {
                    this.weathers.splice(index, 1)
                })
        },
        changeWeather(index, id, weather) {
            axios.put(`http://localhost:8080/api/v2/weather/${id}`, weather)
                .then((res) => {
                    this.weathers[index] = res.data
                    this.goodChange = true
                    setTimeout(() => {
                        this.goodChange = false
                    }, 3000)
                })
                .catch(() => {
                    alert("Неправильные параметры погоды")
                })
        },
        saveWeather() {
            axios.get(`http://localhost:8080/api/v1/weather/db/curr?city=${this.cityName}`)
                .then(() => {
                    this.good1 = true
                    this.getCities()
                    this.getWeathers()
                    setTimeout(() => {
                        this.good1 = false
                    }, 3000)
                })
        },
        saveFiveDaysWeather() {
            axios.get(`http://localhost:8080/api/v1/weather/db/days?city=${this.cityName}`)
                .then(() => {
                    this.good5 = true
                    this.getCities()
                    this.getWeathers()
                    setTimeout(() => {
                        this.good5 = false
                    }, 3000)
                })
        },
        getUsers() {
            axios.get("http://localhost:8080/api/v2/user/all")
                .then((res) => {
                    this.users = res.data
                })
        },
        addUser() {
            axios.post("http://localhost:8080/api/v2/user/", { "name": this.userName })
                .then((res) => {
                    this.users.push(res.data)
                    this.goodAdd = true
                    setTimeout(() => {
                        this.goodAdd = false
                    }, 3000)
                })
                .catch(error => {
                    this.errorAdd = error
                    setTimeout(() => { this.errorAdd = null }, 3000)
                })
            this.userName = ""
        },
        deleteUser(index, id) {
            axios.delete(`http://localhost:8080/api/v2/user/${id}`)
                .then(() => {
                    this.users.splice(index, 1)
                })
        },
        changeUser(index, id, newName) {
            axios.put(`http://localhost:8080/api/v2/user/${id}`, { "name": newName })
                .then(res => {
                    this.users[index] = res.data
                    this.goodChange = true
                    setTimeout(() => { this.goodChange = false }, 3000)
                })
                .catch(error => {
                    this.errorChange = error
                    setTimeout(() => { this.errorChange = null }, 3000)
                })
        },
        getCities() {
            axios.get("http://localhost:8080/api/v2/city/all/sorted")
                .then((res) => {
                    this.cities = res.data
                })
        },
        deleteCity(index, id) {
            axios.delete(`http://localhost:8080/api/v2/city/${id}`)
                .then(() => {
                    this.cities.splice(index, 1)
                })
        },
        changeCity(index, id, newName) {
            axios.put(`http://localhost:8080/api/v2/city/${id}`, { "cityName": newName })
                .then(res => {
                    this.cities[index] = res.data
                    this.goodChange = true
                    setTimeout(() => { this.goodChange = false }, 3000)
                })
                .catch(error => {
                    this.errorChange = error
                    setTimeout(() => { this.errorChange = null }, 3000)
                })
        },
        addCity() {
            axios.post('http://localhost:8080/api/v2/city/', { "cityName": this.cityName })
                .then(res => {
                    this.cities.push(res.data)
                    this.goodAdd = true
                    setTimeout(() => {
                        this.goodAdd = false
                    }, 3000)
                })
                .catch(error => {
                    this.errorAdd = error
                    setTimeout(() => { this.errorAdd = null }, 3000)
                })
            this.cityName = ''
        },
        addCityToFavorites() {
            axios.post('http://localhost:8080/api/v2/city/', { "cityName": this.cityName })
                .then(cityRes => {
                    axios.post(`http://localhost:8080/api/v2/user/add_city?user_id=${this.selectedUser}&city_id=${cityRes.data.id}`)
                        .then(() => {
                            this.getCities()
                            this.getUserCities()
                            this.goodAdd = true
                            setTimeout(() => {
                                this.goodAdd = false
                            }, 3000)
                        })
                })
        },
        getUserCities() {
            axios.get(`http://localhost:8080/api/v2/user/${this.selectedUser}`)
                .then(res => {
                    this.userCities = res.data.cities
                })
        }
    },
    created() {
        this.getUsers()
        this.getWeathers()
        this.getCities()
    },
    watch: {
        category(newCategory, oldCategory) {
            if (newCategory == 'city') {
                this.cityName = ''
            }
        },
        selectedUser(newSelectedUser, oldSelectedUser) {
            if (newSelectedUser != 'none' && newSelectedUser != 'admin') {
                this.getUserCities()
            }
        },
        cityName(newCityName, oldCityName) {
            if (newCityName != oldCityName) {
                this.weather = null
            }
        }
    }
}
</script>

<template>
    <h1>Погода</h1>
    <div class="box">
        <input v-show="this.selectedUser != 'admin'" type="text" v-model="cityName" @keyup.enter="getWeather()"
            placeholder="Введите город">
        <button v-show="this.selectedUser != 'admin'" @click="getWeather()">Получить погоду</button>
        <label for="user-select" class="userLabel">Выберите пользователя:</label>
        <select id="user-select" v-model="selectedUser" class="userSelection">
            <option value="none">None</option>
            <option value="admin">Admin</option>
            <option v-for="user in users" :value="user.id">{{ user.name }}</option>
        </select>
        <p class="errorMessage" v-show="errorGet != null">Неправильное название города!</p>
        <div class="Favorites" v-if="this.selectedUser != 'admin' && this.selectedUser != 'none'">
            <div v-if="this.weather != null" class="addCity">
                <button @click="addCityToFavorites()">Добавить город в Избранные</button>
                <p v-show="this.goodAdd == true" class="goodMessage">Город успешно сохранен в Избранные</p>
            </div>
            <label class="favoritesLabel" for="favorites">Избранные города:</label>
            <select class="favoritesSelection" id="favorites" v-model="cityName">
                <option v-for="city in userCities" :value="city.cityName">{{ city.cityName }}</option>
            </select>
        </div>
        <div v-if="this.weather != null && this.selectedUser != 'admin'">
            <p>Текущая погода в городе {{ cityName }} <button @click="saveWeather()">Сохранить</button></p>
            <p v-show="good1 == true" class="goodMessage">Погода успешно сохранена</p>
            <Weather v-if="this.weather != null && this.selectedUser != 'admin'" :weather="this.weather"></Weather>
        </div>
        <div class="weathers" v-if="this.weather != null && this.selectedUser != 'admin'">
            <p>Погода на пять дней в городе {{ cityName }} <button @click="saveFiveDaysWeather()">Сохранить</button></p>
            <p v-show="good5 == true" class="goodMessage">Погода успешно сохранена</p>
            <Weather v-for="(el, index) in fiveDaysWeather" :key="index" :weather="el" />
        </div>
        <div v-show="selectedUser == 'admin'" class="adminBlock">
            <label for="select-category" class="categoryLabel">Выберите категорию: </label>
            <select id="select-category" v-model="category" class="categorySelection">
                <option value="user">Пользователи</option>
                <option value="weather">Погода</option>
                <option value="city">Города</option>
            </select>
            <div class="userBlock" v-if="category == 'user'">
                <input type="text" v-model="userName" @keyup.enter="addUser()" placeholder="Введите имя пользователя">
                <button @click="addUser()">Добавить пользователя</button>
                <p v-show="this.errorAdd != null || this.errorChange != null" class="errorMessage">Неправильное
                    имя пользователя</p>
                <p v-show="this.goodAdd == true" class="goodMessage">Пользователь успешно добавлен</p>
                <p v-show="this.goodChange == true" class="goodMessage">Пользователь успешно изменен</p>
                <User v-for="(el, index) in users" :key="index" :user="el" :index="index" :deleteUser="deleteUser"
                    :changeUser="changeUser" />
            </div>
            <div class="weatherBlock" v-if="category == 'weather'">
                <div class="createWeather">
                    <table>
                        <tr>
                            <th>Температура:</th>
                            <td><input type="number" v-model="temp" placeholder="Введите температуру" min="-273"
                                    max="100"></td>
                            <td>°C</td>
                        </tr>
                        <tr>
                            <th>Давление:</th>
                            <td><input type="number" v-model="pressure" placeholder="Введите давление" min="0"></td>
                            <td>Па</td>
                        </tr>
                        <tr>
                            <th>Влажность:</th>
                            <td><input type="number" v-model="humidity" placeholder="Введите влажность" min="0"
                                    max="100"></td>
                            <td>%</td>
                        </tr>
                        <tr>
                            <th>Скорость ветра:</th>
                            <td><input type="number" v-model="speed" placeholder="Введите скорость ветра" min="0"
                                    max="120"></td>
                            <td>м/с</td>
                        </tr>
                        <tr>
                            <th>Направление ветра:</th>
                            <td><input type="number" v-model="deg" placeholder="Введите направление ветра" min="0"
                                    max="359"></td>
                            <td>°</td>
                        </tr>
                        <tr>
                            <th>Облачность:</th>
                            <td><input type="number" v-model="clouds" placeholder="Введите облачность" min="0"
                                    max="100"></td>
                            <td>%</td>
                        </tr>
                        <tr>
                            <th>Дата:</th>
                            <td><input type="date" v-model="date" placeholder="Введите дату"></td>
                        </tr>
                        <tr>
                            <th>Описание:</th>
                            <td><select class="typeSelection" id="select-description" v-model="weatherType">
                                    <option :value="{ 'description': 'Чистое небо', 'icon': '01d' }">Чистое небо
                                    </option>
                                    <option :value="{ 'description': 'Небольшая облачность', 'icon': '02d' }">Небольшая
                                        облачность</option>
                                    <option :value="{ 'description': 'Редкая облачность', 'icon': '03d' }">Редкая
                                        облачность
                                    </option>
                                    <option :value="{ 'description': 'Облачно', 'icon': '04d' }">Облачно</option>
                                    <option :value="{ 'description': 'Ливень', 'icon': '09d' }">Ливень</option>
                                    <option :value="{ 'description': 'Дождь', 'icon': '10d' }">Дождь</option>
                                    <option :value="{ 'description': 'Гроза', 'icon': '11d' }">Гроза</option>
                                    <option :value="{ 'description': 'Снег', 'icon': '13d' }">Снег</option>
                                    <option :value="{ 'description': 'Туман', 'icon': '50d' }">Туман</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Город:</th>
                            <td><select class="citySelection" id="select-city" v-model="cityId">
                                    <option v-for="city in cities" :value="city.id">{{ city.cityName }}</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <button class="addWeather" @click="addWeather()">Сохранить прогноз погоды</button>
                </div>
                <p class="errorMessage" v-show="this.errorAdd != null || this.errorChange != null">Неправильные
                    параметры погоды
                </p>
                <p class="goodMessage" v-show="this.goodAdd == true">Погода успешно дабавлена</p>
                <WeatherAdmin v-for="(el, index) in weathers" :key="index" :weather="el" :index="index" :cities="cities"
                    :deleteWeather="deleteWeather" :changeWeather="changeWeather" />
            </div>
            <div class="cityBlock" v-if="category == 'city'">
                <input type="text" v-model="cityName" @keyup.enter="addCity()" placeholder="Введите название города">
                <button @click="addCity()">Добавить город</button>
                <p v-show="this.errorAdd != null || this.errorChange != null" class="errorMessage">Неправильное
                    название города</p>
                <p v-show="this.goodAdd == true" class="goodMessage">Город успешно добавлен</p>
                <p v-show="this.goodChange == true" class="goodMessage">Город успешно изменен</p>
                <City v-for="(el, index) in cities" :key="index" :city="el" :index="index" :deleteCity="deleteCity"
                    :changeCity="changeCity" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.box input {
    width: 300px;
    height: 40px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid darkcyan;
    font-size: 20px;
    padding-left: 8px;
    outline: none;
}

button {
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
    background: rgb(255, 180, 40);
    border: 2px solid darkorange;
    color: white;
    font-size: 15px;
}

.userLabel,
.categoryLabel,
.favoritesLabel {
    margin-left: 20px;
    font-size: 20px;
}

.userSelection,
.categorySelection,
.favoritesSelection {
    margin-left: 10px;
    font-size: 15px;
    outline: none;
}

.favoritesSelection {
    min-width: 100px;
}

.userBlock,
.adminBlock,
.cityBlock {
    margin-top: 20px;
}

.errorMessage {
    color: red;
    padding-left: 20px;
    font-size: 20px;
}

.goodMessage {
    color: green;
    padding-left: 20px;
    font-size: 20px;
}

.createWeather {
    padding-top: 10px;
    margin-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background: rgb(150, 255, 255);
    border-radius: 20px;
    width: 550px;
}

th,
td {
    font-weight: normal;
    font-size: 20px;
    height: 25px;
    width: 100px;
    padding-left: 20px;
}

.typeSelection,
.citySelection {
    outline: none;
    font-size: 20px;
    width: 310px;
    height: 40px;
    background: transparent;
}

.addWeather {
    margin-top: 20px;
    width: 300px;
    margin-left: 125px;
}

.Favorites {
    margin-top: 10px;

    button,
    label,
    p {
        margin-left: 0px;
    }
}

.addCity {
    margin-bottom: 10px;
}
</style>
