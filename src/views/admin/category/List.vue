<template>
    <div>
        <v-card>
            <v-card-title>
                LIST Kategori
                <div class="pl-5">
                    <v-btn small color="success" elevation="0" @click="show()">
                        Tambah
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Cari Kategori"
                    dense outlined
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="categories"
            :search="search"
            :options.sync="option"
            :server-items-length="total"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.name}}</td>
                        <td>{{row.item.description}}</td>
                        <td width="10%">
                            <v-icon small color="green" class="mr-3" @click="updateData(row.item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteData(row.item)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-row justify="center">
                <v-dialog persistent v-model="dialog" max-width="800px" >
                    <category-form :mode="mode" :data="form" :dialog="dialog" @close="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { sanitizeTableQuery } from "@/utils/pagination"
import CategoryForm from './Form.vue'
export default {
    name: 'CategoryList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id',},
            { text: 'Nama', align: 'start', sortable: true, value: 'name',},
            { text: 'Deskripsi', align: 'start', sortable: true, value: 'description',},
            { text: 'Action', align: 'start', sortable: false, value: 'action',},
            ],
            categories: [],
            loading: true,
            total: 0,
            option: {},
            form: {},
            mode: 0,
            dialog: false,
        }
    },
    components: {
        CategoryForm
    },
    methods: {
        ...mapActions({
            getCategory: 'category/all',
            deleteRow: 'category/deleteOne'
        }),
        async load(){
            this.loading = true
            let q = sanitizeTableQuery(this.option, true)
            q.populate='*'
            await this.getCategory(q).then(({data}) => {
                this.categories = data.data.map(c => {
                    c.name = c.attributes.name
                    c.description = c.attributes.description
                    return c
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