<script>
import Weather from './Weather.vue';
export default {
    components: { Weather },
    props: {
        weather: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        cities: {
            type: Array,
            required: true
        },
        deleteWeather: {
            type: Function,
            required: true
        },
        changeWeather: {
            type: Function,
            required: true
        },
    },
    data() {
        return {
            changing: false,
            temp: this.weather.temp,
            pressure: this.weather.pressure,
            humidity: this.weather.humidity,
            speed: this.weather.speed,
            deg: this.weather.deg,
            clouds: this.weather.clouds,
            date: this.weather.date.year + '-' +
                ('0' + this.weather.date.month).slice(-2) + '-' +
                ('0' + this.weather.date.day).slice(-2),
            weatherType: { "description": this.weather.weatherDescription, "icon": this.weather.weatherIcon },
            cityId: this.weather.city.id
        }
    },
    methods: {
        closeChangeWindow() {
            this.changing = false
        }
    }
}
</script>

<template>
    <div class="weatherAdmin" v-click-outside="closeChangeWindow">
        <table>
            <tr>
                <td class="city">Город: {{ weather.city.cityName }}</td>
            </tr>
            <tr>
                <th id="weather" rowspan="2">
                    <Weather :weather="this.weather" />
                </th>
                <td><button class="buttonChange" @click="this.changing = true">Изменить прогноз</button></td>
            </tr>
            <tr>
                <td><button class="buttonDelete" @click="deleteWeather(this.index, this.weather.id)">Удалить
                        прогноз</button></td>
            </tr>
        </table>
        <div class="changeWeather" v-if="changing == true">
            <table>
                <tr>
                    <th>Температура:</th>
                    <td><input type="number" v-model="temp" placeholder="Введите температуру" min="-273" max="100"></td>
                    <td>°C</td>
                </tr>
                <tr>
                    <th>Давление:</th>
                    <td><input type="number" v-model="pressure" placeholder="Введите давление" min="0"></td>
                    <td>Па</td>
                </tr>
                <tr>
                    <th>Влажность:</th>
                    <td><input type="number" v-model="humidity" placeholder="Введите влажность" min="0" max="100"></td>
                    <td>%</td>
                </tr>
                <tr>
                    <th>Скорость ветра:</th>
                    <td><input type="number" v-model="speed" placeholder="Введите скорость ветра" min="0" max="120">
                    </td>
                    <td>м/с</td>
                </tr>
                <tr>
                    <th>Направление ветра:</th>
                    <td><input type="number" v-model="deg" placeholder="Введите направление ветра" min="0" max="359">
                    </td>
                    <td>°</td>
                </tr>
                <tr>
                    <th>Облачность:</th>
                    <td><input type="number" v-model="clouds" placeholder="Введите облачность" min="0" max="100"></td>
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
            <button class="changeWeatherButton" @click="
                changeWeather(index, this.weather.id, {
                    'temp': this.temp,
                    'pressure': this.pressure,
                    'humidity': this.humidity,
                    'speed': this.speed,
                    'deg': this.deg,
                    'clouds': this.clouds,
                    'date': {
                        'day': this.date.slice(8, 10),
                        'month': this.date.slice(5, 7),
                        'year': this.date.slice(0, 4)
                    },
                    'cityId': this.cityId,
                    'weatherDescription': this.weatherType.description,
                    'weatherIcon': this.weatherType.icon
                }), changing = false">Изменить прогноз погоды</button>
        </div>
    </div>
</template>

<style scoped>
button {
    width: 200px;
    margin-left: 10px;
}

.weatherAdmin {
    margin-top: 10px;
    background: rgb(241, 238, 238);
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
}

.city {
    padding-top: 10px;
    font-size: 20px;
}

.changeWeather {
    padding-top: 20px;

    th,
    td {
        font-weight: normal;
        font-size: 20px;
        height: 25px;
        width: 100px;
        padding-left: 20px;
    }

    input {
        width: 300px;
        height: 40px;
        background: transparent;
        border: 0;
        border-bottom: 2px solid darkgray;
        font-size: 20px;
        padding-left: 8px;
        outline: none;
    }
}

.typeSelection,
.citySelection {
    outline: none;
    font-size: 20px;
    width: 310px;
    height: 40px;
    background: transparent;
}

.changeWeatherButton {
    margin-top: 20px;
    width: 300px;
    margin-left: 200px;
    cursor: pointer;
    background: rgb(255, 180, 40);
    border: 2px solid darkorange;
    color: white;
    font-size: 15px;
}
</style>
