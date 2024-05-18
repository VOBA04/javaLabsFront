<template>
    <div>
        <table>
            <tr>
                <th id="username" rowspan="2">{{ this.user.name }}</th>
                <td><input type="text" v-model="newUserName" placeholder="Новое имя пользователя"
                        @keyup.enter="changeUser(this.index, this.user.id, this.newUserName), this.newUserName = ''">
                </td>
                <td class="button"><button class="buttonChange"
                        @click="changeUser(this.index, this.user.id, this.newUserName), this.newUserName = ''">Изменить
                        имя
                        пользователя</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="button"><button class="buttonDelete" @click="deleteUser(this.index, this.user.id)">Удалить
                        пользователя</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        deleteUser: {
            type: Function,
            required: true
        },
        changeUser: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            newUserName: '',
            good: false,
            error: null
        }
    }
}
</script>

<style scoped>
table {
    margin-top: 10px;
    background: rgb(241, 238, 238);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    border-radius: 10px;
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