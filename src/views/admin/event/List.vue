<template>
    <div>
        <v-card>
            <v-card-title>
                LIST EVENT
                <div class="pl-5">
                    <v-btn small color="success" elevation="0" @click="show()">
                        Tambah
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Cari Event"
                    dense outlined
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="events"
            :search="search"
            :options.sync="option"
            :server-items-length="total"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.title}}</td>
                        <td>{{row.item.content.substring(0,50)}}</td>
                        <td>
                            <span v-if="row.item.is_publish">
                                <v-chip small label color="success" dark>Publis</v-chip>
                            </span>
                            <span v-else>
                                <v-chip small label color="yellow darken-2" dark>Pending</v-chip>
                            </span>
                        </td>
                        <td>
                            <span v-if="row.item.is_active">
                                <v-chip small label color="success" dark>Aktif</v-chip>
                            </span>
                            <span v-else>
                                <v-chip small label color="yellow darken-2" dark>Nonaktif</v-chip>
                            </span>
                        </td>
                        <td>{{row.item.start_date | formatDate}}</td>
                        <td>{{row.item.end_date | formatDate}}</td>
                        <td width="10%">
                            <v-icon small color="green" class="mr-3" @click="updateData(row.item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteData(row.item)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-row justify="center">
                <v-dialog persistent v-model="dialog" max-width="800px" >
                    <event-form :mode="mode" :data="form" :dialog="dialog" @close="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { sanitizeTableQuery } from "@/utils/pagination"
import EventForm from './Form.vue'
export default {
    name: 'PostList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id',},
            { text: 'Judul', align: 'start', sortable: true, value: 'title',},
            { text: 'Konten', align: 'start', sortable: true, value: 'content',},
            { text: 'Status Publis', align: 'start', sortable: true, value: 'is_publish',},
            { text: 'Status Aktif', align: 'start', sortable: true, value: 'is_active',},
            { text: 'Event Dimulai', align: 'start', sortable: true, value: 'start_date',},
            { text: 'Event Berakhir', align: 'start', sortable: true, value: 'end_date',},
            { text: 'Action', align: 'start', sortable: false, value: 'action',},
            ],
            events: [],
            loading: true,
            total: 0,
            option: {},
            form: {},
            mode: 0,
            dialog: false,
        }
    },
    components: {
        EventForm
    },
    methods: {
        ...mapActions({
            getEvent: 'event/all',
            deleteRow: 'event/deleteOne'
        }),
        async load(){
            this.loading = true
            let q = sanitizeTableQuery(this.option, true)
            q.populate='*'
            await this.getEvent(q).then(({data}) => {
                this.events = data.data.map(e => {
                    e.title = e.attributes.title
                    e.slug = e.attributes.slug
                    e.content = e.attributes.content
                    e.image = e.attributes.image
                    e.committee = e.attributes.committee
                    e.is_publish = e.attributes.is_publish
                    e.is_active = e.attributes.is_active
                    e.start_date = e.attributes.start_date
                    e.end_date = e.attributes.end_date
                    return e
                })
                this.total = data.length
            }).finally(() => {
                this.loading = false
            })
        },
        show(){
            this.mode = 0
            this.form = {}
            this.dialog = true
        },
        closeDialog(){
            this.dialog = false
            this.load()  
        },
        updateData(row){
            this.form = row
            this.mode = 1
            this.dialog = true
        },
        async deleteData(row){
            await this.$dialog.confirm({
                text: 'Yakin menghapus data '+row.title+'?',
                title: 'Konfirmasi'
            }).then(resp => {
                if(resp){
                    this.deleteRow(row).then(q => {
                        if(q.status == 200){
                            this.load()
                            this.$toast.success("Berhasil menghapus data.")
                        }else this.$toast.error("Gagal menghapus data.")
                    })
                }
            })
        },
    },
    mounted(){
        this.load()
    }
}
</script>