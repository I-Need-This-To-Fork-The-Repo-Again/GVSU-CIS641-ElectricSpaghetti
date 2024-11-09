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
                    <td class="text-center border-s-sm" v-for="(ascore, index) in awayObject.inningScore" :key="index">{{ ascore }}</td>
                    <td class="text-center border-s-lg"> {{ awayObject.runs }} </td>
                    <td class="text-center border-s-sm"> {{ awayObject.hits }} </td>
                </tr>
                <tr>
                    <td>{{ homeObject.initials }}</td>
                    <td class="text-center border-s-sm" v-for="(hscore, index) in homeObject.inningScore" :key="index">{{ hscore }}</td>
                    <td class="text-center border-s-lg"> {{ homeObject.runs }} </td>
                    <td class="text-center border-s-sm"> {{ homeObject.hits }} </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
export default {
    name: 'PlayerList',

    props: ['gameObject', 'homeObject', 'awayObject'],

    data() {

    },

    mounted() {
        console.log(this.teamList)
    }
}
</script>