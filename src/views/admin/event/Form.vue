<template>
  <v-card class="pa-5">
        <v-toolbar color="primary" flat dark>EVENT</v-toolbar>
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
                        :rules="contentRules"
                    ></vue-editor>
                    <vue-editor
                        v-model="form.committee"
                        :rules="committeeRules"
                    ></vue-editor>
                    <v-row>
                        <v-switch
                            v-model="form.is_publish"
                            inset
                            label="Status Publish"
                            class="pt-10 pl-5 pr-10"
                        ></v-switch>
                        <v-switch
                            v-model="form.is_active"
                            inset
                            label="Status Aktif"
                            class="pt-10 pl-5 pr-10"
                        ></v-switch>
                    </v-row>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        >
                            <v-date-picker
                                v-model="dates"
                                range
                            ></v-date-picker>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field
                                v-model="dateRangeText"
                                label="Date range"
                                prepend-icon="mdi-calendar"
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
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
            titleRules: [
                value => !!value || 'Judul tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            slugRules: [
                value => !!value || 'Slug tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            imageRules: [
                // value => !value || value.size < 2000000 || 'Gambar maksimal 2 MB!',
            ],
            contentRules: [
                value => !!value || 'Konten tidak boleh kosong',
            ],
            committeeRules: [
                value => !!value || 'Kategori tidak boleh kosong',
            ],
            dates: [],
            // end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
        },
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
    },
    methods: {
        ...mapActions({
            saveData: 'event/create',
            updateData: 'event/update',
        }),
        closeDialog(){
            this.$emit('close', false)
        },
        async save(){
            if(this.$refs.form.validate()){
                try{
                    this.form.start_date = this.dates[0]
                    this.form.end_date = this.dates[1]
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