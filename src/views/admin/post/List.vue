<template>
    <div>
        <v-card>
            <v-card-title>
                LIST POSTINGAN
                <div class="pl-5">
                    <v-btn small color="success" elevation="0" @click="show()">
                        Tambah
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Cari postingan"
                    dense outlined
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="posts"
            :search="search"
            :options.sync="option"
            :server-items-length="total"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.id}}</td>
                        <td>{{row.item.title}}</td>
                        <td>{{row.item.content.substring(0,50)}}</td>
                        <td>{{row.item.image}}</td>
                        <td>{{row.item.category}}</td>
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
                    <post-form :mode="mode" :data="form" :dialog="dialog" @close="closeDialog"/>
                </v-dialog>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { sanitizeTableQuery } from "@/utils/pagination"
import PostForm from './Form.vue'
export default {
    name: 'PostList',
    data(){
        return{
            search: '',
            headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id',},
            { text: 'Judul', align: 'start', sortable: true, value: 'title',},
            { text: 'Konten', align: 'start', sortable: true, value: 'content',},
            { text: 'Gambar', align: 'start', sortable: true, value: 'image',},
            { text: 'Kategori', align: 'start', sortable: true, value: 'category',},
            { text: 'Status', align: 'start', sortable: true, value: 'is_publish',},
            { text: 'Tanggal Publis', align: 'start', sortable: true, value: 'publish_date',},
            { text: 'Action', align: 'start', sortable: false, value: 'action',},
            ],
            posts: [],
            loading: true,
            total: 0,
            option: {},
            form: {},
            mode: 0,
            dialog: false,
        }
    },
    components: {
        PostForm
    },
    methods: {
        ...mapActions({
            getPost: 'post/all',
            deleteRow: 'post/deleteOne'
        }),
        async load(){
            this.loading = true
            let q = sanitizeTableQuery(this.option, true)
            q.populate='*'
            await this.getPost(q).then(({data}) => {
                this.posts = data.data.map(p => {
                    p.title = p.attributes.title
                    p.slug = p.attributes.slug
                    p.is_publish = p.attributes.is_publish
                    p.content = p.attributes.content
                    p.tag = p.attributes.tag
                    p.image = p.attributes.image.data
                    p.publish_date = p.attributes.publish_date
                    p.category_name = p.attributes.category.data.attributes.name
                    p.category = p.attributes.category.data.id
                    return p
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
            await this.$toast.info({
                message: 'Yakin menghapus data' + ` ${row.title}?`
            }).then(resp => {
                if(resp){
                    this.deleteRow(row).then(q => {
                        if(q.status == 200){
                            this.load()
                            this.$toast.success('Berhasil menghapus data')
                        }else this.$toast.error('Gagal menghapus data')
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