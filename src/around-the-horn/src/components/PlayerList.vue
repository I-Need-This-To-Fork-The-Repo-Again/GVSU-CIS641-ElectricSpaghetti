<template>
    <div>
        <v-table>
            <tbody>
                <tr v-for="player in teamList" :key="player.number">
                    <td>{{ player.number }}</td>
                    <td>{{ player.name }}</td>
                    <td>{{ player.position }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
export default {
    name: 'PlayerList',

    props: ['teamList'],

    data() {

    },

    mounted() {
        console.log(this.teamList)
    }
}
</script>