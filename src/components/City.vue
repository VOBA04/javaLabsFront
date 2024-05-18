<template>
    <div v-click-outside="clearWeather" class="city">
        <table>
            <tr>
                <th id="cityname" rowspan="3">{{ this.city.cityName }}</th>
                <td><input type="text" v-model="newCityName" placeholder="Новое название города"
                        @keyup.enter="changeCity(this.index, this.city.id, this.newCityName), this.newCityName = ''">
                </td>
                <td class="button"><button class="buttonChange"
                        @click="changeCity(this.index, this.city.id, this.newCityName), this.newCityName = ''">Изменить
                        название города</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="button"><button class="buttonDelete" @click="deleteCity(this.index, this.user.id)">Удалить
                        город</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="button"><button class="buttonGet" @click="getWeather()">Показать
                        всю
                        погоду</button></td>
            </tr>
        </table>
    </div>
    <div class="weather" v-if="weatherWindow == true">
        <Weather v-for="(el, index) in weather" :key="index" :weather="el" />
    </div>
</template>

<script>
import axios from 'axios';
import Weather from './Weather.vue';
export default {
    components: { Weather },
    props: {
        city: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        deleteCity: {
            type: Function,
            required: true
        },
        changeCity: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            newCityName: '',
            good: false,
            error: null,
            weather: [],
            weatherWindow: false
        }
    },
    methods: {
        getWeather() {
            axios.get(`http://localhost:8080/api/v2/city/weather/sorted/${this.city.id}`)
                .then(res => {
                    this.weather = res.data.weather
                    this.weatherWindow = true
                })
        },
        clearWeather() {
            this.weatherWindow = false
            this.weather.length = 0
        }
    }
}
</script>

<style scoped>
.city {
    margin-top: 10px;
    background: rgb(241, 238, 238);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    border-radius: 10px;
}

.weather {
    margin-left: 20px;
}

th {
    font-weight: normal;
    font-size: 25px;
    text-align: left;
}

th,
td {
    width: 150px;
    padding-left: 20px;
}

.button {
    width: 200px;
}

input {
    outline: none;
    height: 15px;
    width: 160px;
}
</style>