<template>
  <v-card class="pa-5">
        <v-toolbar color="primary" flat dark>I CARE</v-toolbar>
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
                        label="Nama"
                        required
                        :rules="nameRules"
                        v-model="form.name"
                    ></v-text-field>
                    <v-text-field
                        label="Gembala Icare"
                        required
                        :rules="mentorRules"
                        v-model="form.mentor"
                    ></v-text-field>
                    <v-text-field
                        label="No. Telp"
                        required
                        type="number"
                        :rules="phoneRules"
                        v-model="form.phone"
                    ></v-text-field>
                    <v-file-input
                        :rules="imageRules"
                        v-model="form.avatar"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pilih gambar"
                        prepend-icon="mdi-camera"
                        label="Photo Gembala I Care"
                    ></v-file-input>
                    <v-file-input
                        :rules="imageRules"
                        v-model="form.image"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pilih gambar"
                        prepend-icon="mdi-camera"
                        label="Gambar"
                    ></v-file-input>
                    <vue-editor
                        v-model="form.description"
                        :rules="descriptionRules"
                    ></vue-editor>
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
            color="green darken-1"
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
import { VueEditor } from "vue2-editor"

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
            nameRules: [
                value => !!value || 'Nama tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            mentorRules: [
                value => !!value || 'Gembala I Care tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            phoneRules: [
                value => !!value || 'No. Telp tidak boleh kosong',
            ],
            imageRules: [
                // value => !value || value.size < 2000000 || 'Gambar maksimal 2 MB!',
            ],
            descriptionRules: [
                value => !!value || 'Konten tidak boleh kosong',
            ],
            publish_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
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
            saveData: 'icare/create',
            updateData: 'icare/update',
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
                        } else this.$toast.error('Gagal menyimpan data')
                        })
                    } else {
                        /** UPDATE */
                        this.form.image = null
                        this.form.avatar = null
                        await this.updateData(this.form).then((resp) => {
                        if(resp.status){
                            this.form = {}
                            this.$emit('close',false);
                            this.$toast.success('Berhasil mengubah data')
                        } else this.$toast.error('Gagal mengubah data')
                        })
                    }
                }catch(e){
                console.log(e)
                }
            }
        },
    },
}
</script>

<style>

</style>