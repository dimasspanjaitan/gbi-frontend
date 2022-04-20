<template>
    <div>
        <v-card>
            <v-card-title>
                LIST ICARE
                <div class="pl-5">
                    <v-btn small color="success" elevation="0" @click="show()">
                        Tambah
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Cari Icare"
                    dense outlined
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="icares"
            :search="search"
            :options.sync="option"
            :server-items-length="total"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.name}}</td>
                        <td>{{row.item.mentor}}</td>
                        <td>{{row.item.phone}}</td>
                        <td>{{row.item.description.substring(0,50)}}</td>
                        <td width="10%">
                            <v-icon small color="green" class="mr-3" @click="updateData(row.item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteData(row.item)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-row justify="center">
                <v-dialog persistent v-model="dialog" max-width="800px" >
                    <icare-form :mode="mode" :data="form" :dialog="dialog" @close="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { sanitizeTableQuery } from "@/utils/pagination"
import IcareForm from './Form.vue'
export default {
    name: 'IcareList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id',},
            { text: 'Nama', align: 'start', sortable: true, value: 'name',},
            { text: 'Gembala Icare', align: 'start', sortable: true, value: 'mentor',},
            { text: 'No.Telp', align: 'start', sortable: true, value: 'phone',},
            { text: 'Deskripsi', align: 'start', sortable: true, value: 'description',},
            { text: 'Action', align: 'start', sortable: false, value: 'action',},
            ],
            icares: [],
            loading: true,
            total: 0,
            option: {},
            form: {},
            mode: 0,
            dialog: false,
        }
    },
    components: {
        IcareForm
    },
    methods: {
        ...mapActions({
            getIcare: 'icare/all',
            deleteRow: 'icare/deleteOne'
        }),
        async load(){
            this.loading = true
            let q = sanitizeTableQuery(this.option, true)
            q.populate='*'
            await this.getIcare(q).then(({data}) => {
                this.icares = data.data.map(i => {
                    i.name = i.attributes.name
                    i.mentor = i.attributes.mentor
                    i.phone = i.attributes.phone
                    i.avatar = i.attributes.avatar
                    i.image = i.attributes.image
                    i.description = i.attributes.description
                    return i
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
                text: 'Yakin menghapus data '+row.name+'?',
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