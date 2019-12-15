<template>
    <div id="nauta">
        <div class="container">
            
            <div class="align-center flex flex-column align-self-center" style="text-align:center;">
                <div>
                    <p class="font-weight-light display-1 text-center pt-10" style="text-align:justify; font-size:1.5rem;"
                        >Esta seccion estima la población futura del distrito de <b>Nauta</b>
                    <br> Tomando en cuenta los censos nacionales del 1993, 2007 y 2017.  </p>
                </div>
            </div>

            <div class="anio">
                  <v-container fluid>
                    <v-row align="center">
                    <v-col cols="6">
                        <v-subheader>Año</v-subheader>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                        @click="EnviarInfo"
                        v-model="select"                        
                        :items="items"
                        item-text="state"
                        item-value="abbr"
                        label="Año a estimar"
                        persistent-hint
                        return-object
                        single-line
                        ></v-select>
                    </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
        

        <section class="py-5">
           <Dashboard_Nauta :anio_in="select"/>
        </section>
    </div>
</template>

<script>
import Dashboard_Nauta from './Dashboard_Nauta'

    export default {
    name:'Nauta',
    data () {        
        return {    
            envio:false,   
            limpiesa:false,      
            select: { state: '2019', abbr: '2019' },
            items: [                
            ],
        }
    },
    components:{
        Dashboard_Nauta
    },
    methods:{
        Anios: function () {
            for(var i = 2019 ; i <= 2050; i++)
            {
                this.items.push(i,i);               
            }
        },
        EnviarInfo(){                          
            this.envio = true;                    
        },
        Limpiar(){
            this.envio = false;            
        }        
    },
    mounted(){
        this.Anios()
    },
    
    
}
</script>

<style scoped>
.anio{
    width: 350px;    
}
@media (max-width: 800px){
.anio{
    width: 50%;
    }
}
@media (max-width: 600px){
    .anio{
        width: 100%;
    }
}
</style>