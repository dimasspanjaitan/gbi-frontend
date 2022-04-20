<template>
  <v-card class="pa-5">
        <v-toolbar color="primary" flat dark>RENUNGAN HARIAN</v-toolbar>
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
                        label="Tema"
                        required
                        :rules="themeRules"
                        v-model="form.theme"
                    ></v-text-field>
                    <v-text-field
                        label="Slug"
                        required
                        placeholder="pisahkan dengan tanda -"
                        :rules="slugRules"
                        v-model="form.slug"
                    ></v-text-field>
                    <v-text-field
                        label="Ayat Alkitab"
                        required
                        :rules="verseRules"
                        v-model="form.verse"
                    ></v-text-field>
                    <vue-editor
                        v-model="form.content"
                        :rules="contentRules"
                        
                    ></vue-editor>
                    <v-row>
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.publish_date"
                                    label="Tanggal Publis"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    class="pa-2 pt-10"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="form.publish_date"
                            @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-switch
                            v-model="form.is_publish"
                            inset
                            label="Status"
                            class="pt-10 pl-5 pr-10"
                        ></v-switch>
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
            themeRules: [
                value => !!value || 'Tema tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            slugRules: [
                value => !!value || 'Slug tidak boleh kosong',
                value => (value || '').length <= 40 || 'Maksimal 40 karakter',
            ],
            verseRules: [],
            contentRules: [
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
            saveData: 'musing/create',
            updateData: 'musing/update',
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