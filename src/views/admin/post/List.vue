<template>
    <div>
        <v-card>
            <v-card-title>
                LIST POSTINGAN
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            ></v-data-table>
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'PostList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'Header1', align: 'start', sortable: false, value: 'name',},
            { text: 'Header2', align: 'start', sortable: false, value: 'name',},
            { text: 'Header3', align: 'start', sortable: false, value: 'name',},
            { text: 'Header4', align: 'start', sortable: false, value: 'name',},
            { text: 'Header5', align: 'start', sortable: false, value: 'name',},
            ],
            items: [],
        }
    }
}
</script>