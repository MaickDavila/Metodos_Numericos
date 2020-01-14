<template>
  <div>
    <v-toolbar color="#00897b">
      <v-toolbar-title style="color:white;">{{titulo}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text> 
            <img src="img/fisi.png" alt="">
        </v-btn>
        
        <v-btn text>
            <img src="img/unap.svg" alt="">
        </v-btn>    

        <v-btn href="docs/manual.pdf" target="_blank" text color="white">            
            Ayuda
        </v-btn>    


      </v-toolbar-items>

    </v-toolbar>    
  </div>
</template>

<script>
    export default {
        data(){
            return{
                titulo:'UNAP'
            }
        },
        methods:{
            pantalla(){
                
                if (screen.width < 1024) 
                {           
                    this.titulo = "UNAP"
                }
                else 
                {
                    this.titulo = "Universidad Nacional de la Amazonía Peruana"
                }
            }
        },
        mounted(){
            this.pantalla()
        }
    }
</script>

<style lang="scss" scoped>
img{
    width: 30px;
}
</style>