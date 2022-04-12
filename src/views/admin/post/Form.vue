<template>
  <v-card>
        <v-card-title>
          <span class="text-h5 ml-3">List Postingan</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                    <v-text-field
                        label="Judul"
                        required
                        :rules="titleRules"
                        v-model="form.title"
                    ></v-text-field>
                    <v-text-field
                        label="Slug"
                        required
                        placeholder="pisahkan dengan tanda -"
                        :rules="slugRules"
                        v-model="form.slug"
                    ></v-text-field>
                    <v-file-input
                        :rules="imageRules"
                        v-model="form.image"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pilih gambar"
                        prepend-icon="mdi-camera"
                        label="Gambar"
                    ></v-file-input>
                    <vue-editor
                        v-model="form.content"
                    ></vue-editor>
                    <v-switch
                        v-model="form.is_publish"
                        inset
                        label="Status"
                    ></v-switch>
                    <v-select
                        :items="categories"
                        label="Kategori"
                        v-model="form.category"
                    ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="grey darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
        <!-- <snack-bar :active="sb.active" :timeout="sb.timeout" :message="sb.message" :color="sb.color" /> -->
      </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";

export default {
    props: {
      dialog: {
          type: Boolean,
          default: () => false
      },
      data: {
        type: Object,
        default: () => null
      },
      mode: {
        type: Number,
        default: () => 0
      }
    },
    data(){
        return{
            titleRules: [
                value => !!value || 'Judul tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            slugRules: [
                value => !!value || 'Slug tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            imageRules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            categories: []
        }
    },
    components: {
        VueEditor
    },
    computed: {
        form :function(){
            if(!this.mode) return {}
            else return this.data
        }
    },
    methods: {
        ...mapActions({
            saveData: 'post/create',
            getCategory: 'category/all'
        }),
        closeDialog(){
            this.$emit('close', false)
        },
        async save(){
            if(this.$refs.form.validate()){
                try{
                    if(!this.mode) {
                        /** INSERT */
                        this.saveData(this.form).then((resp) => {
                        if(resp.status){
                            this.form = {};
                            this.$emit('close', false);
                            this.$toast.success('Berhasil menyimpan data')
                        } else this.$toast.error(resp.message);
                        })
                    } else {
                        /** UPDATE */
                        await this.updateData(this.form).then((resp) => {
                        if(resp.status){
                            this.form = {}
                            this.$emit('close',false);
                            this.$toast.success('Berhasil mengubah data')
                        } else this.$toast.error(resp.message);
                        })

                    }
                }catch(e){
                this.$toast.error(this.$t('i_notvalid'));
                }
            }
        },
        async load(){
            await this.getCategory().then((resp) => {
                if(resp.status){
                    this.categories = resp.data.data.map((q) =>{
                        return {
                            text: q.attributes.name,
                            value: q.id
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.load()
    }
}
</script>

<style>

</style>