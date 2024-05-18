<script>
export default {
    props: {
        weather: {
            type: Object,
            required: true
        }
    },
    computed: {
        Temperature() {
            return "Темпаратура: " + this.weather.temp + "°C"
        },
        Pressure() {
            return "Давление: " + this.weather.pressure + " Па"
        },
        Humidity() {
            return "Влажность: " + this.weather.humidity + "%"
        },
        Speed() {
            return "Скорость ветра: " + this.weather.speed + " м/с"
        },
        Deg() {
            return "Направление ветра: " + this.weather.deg + "°"
        },
        Clouds() {
            return "Облачность: " + this.weather.clouds + "%"
        },
        Date() {
            return ("0" + this.weather.date.day).slice(-2) + "." +
                ("0" + this.weather.date.month).slice(-2) + "." +
                this.weather.date.year
        },
        Description() {
            return this.weather.weatherDescription;
        }
    },
    methods: {
        changeNtoD() {
            if (this.weather.weatherIcon != null) {
                this.weather.weatherIcon = this.weather.weatherIcon.replace('n', 'd')
            }
        }
    },
    created() {
        this.changeNtoD()
    }
}
</script>

<template>
    <div>
        <table>
            <tr>
                <th>{{ Date }}</th>
                <th colspan="2" v-if="this.weather.weatherDescription == null || this.weather.weatherDescription == ''">
                    Прогноз погоды</th>
                <th colspan="2" v-else>{{ Description }}</th>
            </tr>
            <tr>
                <td rowspan="3" v-if="this.weather.weatherIcon == null || this.weather.weatherIcon == ''"><img
                        :src="'https://http.cat/404'" :alt="'Icon is not found'" style="width: 100px;height: 100px;">
                </td>
                <td rowspan="3" v-else><img
                        :src="`https://openweathermap.org/img/wn/${this.weather.weatherIcon}@2x.png`"
                        :alt="this.weather.weatherDiscription"></td>
                <td class="readings">{{ Temperature }}</td>
                <td class="readings">{{ Pressure }}</td>
            </tr>
            <tr>
                <td class="readings">{{ Speed }}</td>
                <td class="readings">{{ Deg }}</td>
            </tr>
            <tr>
                <td class="readings">{{ Humidity }}</td>
                <td class="readings">{{ Clouds }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
table,
td,
th {
    border: 1px solid black;
    font-weight: normal;
    background: transparent;
}

table {
    margin-top: 20px;
}

.readings {
    padding-left: 5px;
    width: 180px;
}
</style>