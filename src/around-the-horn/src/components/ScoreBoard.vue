<template>
    <div>
        <v-table>
            <thead>
                <th class="border-b-sm"></th>
                <th class="border-s-sm border-b-sm">1</th>
                <th class="border-s-sm border-b-sm">2</th>
                <th class="border-s-sm border-b-sm">3</th>
                <th class="border-s-lg border-b-sm">R</th>
                <th class="border-s-sm border-b-sm">H</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{ awayObject.initials }}</td>
                    <td class="text-center border-s-sm" v-for="(ascore, index) in awayObject.inningScore" :key="index">
                        {{ ascore }}</td>
                    <td class="text-center border-s-lg"> {{ awayObject.runs }} </td>
                    <td class="text-center border-s-sm"> {{ awayObject.hits }} </td>
                </tr>
                <tr>
                    <td>{{ homeObject.initials }}</td>
                    <td class="text-center border-s-sm" v-for="(hscore, index) in homeObject.inningScore" :key="index">
                        {{ hscore }}</td>
                    <td class="text-center border-s-lg"> {{ homeObject.runs }} </td>
                    <td class="text-center border-s-sm"> {{ homeObject.hits }} </td>
                </tr>
            </tbody>
        </v-table>
    </div>
    <v-row class="mt-2">
        <v-col class="d-flex justify-center">
            <v-img v-if="gameObject.outs < 1" rel="preload" max-width="50" src="../assets/empty_out.png"></v-img>
            <v-img v-else rel="preload" max-width="50" src="../assets/out.png"></v-img>
        </v-col>
        <v-col class="d-flex justify-center">
            <v-img v-if="gameObject.outs < 2" rel="preload" max-width="50" src="../assets/empty_out.png"></v-img>
            <v-img v-else rel="preload" max-width="50" src="../assets/out.png"></v-img>
        </v-col>
        <v-col class="d-flex justify-center">
            <v-img v-if="gameObject.outs < 3" rel="preload" max-width="50" src="../assets/empty_out.png"></v-img>
            <v-img v-else rel="preload" max-width="50" src="../assets/out.png"></v-img>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ScoreBoard',

    props: ['gameObject', 'homeObject', 'awayObject'],

    data() {

    },

    mounted() {
        console.log(this.teamList)
    }
}
</script>