<template>
    <div>
        <v-card>
            <v-card-title>
                LIST RENUNGAN
                <div class="pl-5">
                    <v-btn small color="success" elevation="0" @click="show()">
                        Tambah
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Cari Renungan"
                    dense outlined
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="musings"
            :search="search"
            :options.sync="option"
            :server-items-length="total"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.title}}</td>
                        <td>{{row.item.theme}}</td>
                        <td>{{row.item.verse}}</td>
                        <td>{{row.item.content.substring(0,50)}}</td>
                        <td>
                            <span v-if="row.item.is_publish">
                                <v-chip small label color="success" dark>Publis</v-chip>
                            </span>
                            <span v-else>
                                <v-chip small label color="yellow darken-2" dark>Pending</v-chip>
                            </span>
                        </td>
                        <td>{{row.item.publish_date | formatDate}}</td>
                        <td width="10%">
                            <v-icon small color="green" class="mr-3" @click="updateData(row.item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteData(row.item)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-row justify="center">
                <v-dialog persistent v-model="dialog" max-width="800px" >
                    <musing-form :mode="mode" :data="form" :dialog="dialog" @close="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { sanitizeTableQuery } from "@/utils/pagination"
import MusingForm from './Form.vue'
export default {
    name: 'MusingList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id',},
            { text: 'Judul', align: 'start', sortable: true, value: 'title',},
            { text: 'Tema', align: 'start', sortable: true, value: 'theme',},
            { text: 'Ayat Alkitab', align: 'start', sortable: true, value: 'verse',},
            { text: 'Konten', align: 'start', sortable: true, value: 'content',},
            { text: 'Status', align: 'start', sortable: true, value: 'is_publish',},
            { text: 'Tanggal Publis', align: 'start', sortable: true, value: 'publish_date',},
            { text: 'Action', align: 'start', sortable: false, value: 'action',},
            ],
            musings: [],
            loading: true,
            total: 0,
            option: {},
            form: {},
            mode: 0,
            dialog: false,
        }
    },
    components: {
        MusingForm
    },
    methods: {
        ...mapActions({
            getMusing: 'musing/all',
            deleteRow: 'musing/deleteOne'
        }),
        async load(){
            this.loading = true
            let q = sanitizeTableQuery(this.option, true)
            q.populate='*'
            await this.getMusing(q).then(({data}) => {
                this.musings = data.data.map(m => {
                    m.title = m.attributes.title
                    m.theme = m.attributes.theme
                    m.slug = m.attributes.slug
                    m.verse = m.attributes.verse
                    m.content = m.attributes.content
                    m.is_publish = m.attributes.is_publish
                    m.publish_date = m.attributes.publish_date
                    return m
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