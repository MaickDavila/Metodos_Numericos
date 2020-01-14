<template>
    <div id="nauta">
        <div class="container">
            
            <div class="align-center flex flex-column align-self-center" style="text-align:center;">
                <div>
                    <p class="font-weight-light" style="text-align:justify; font-size:1.5rem;"
                        >Esta sección estima la población futura de poblaciones <b>pequeñas</b>
                     <br> tomando en cuenta los censos nacionales del 1993, 2007 y 2017.</p>
                </div>
            </div>

            <div class="">

                <div>
                    <template>
                        <v-form>
                            <v-container>
                            <v-row>

                                <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                    type="number"
                                    v-model="poblacion1"
                                    label="1993"
                                    aria-required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                type="number"
                                    v-model="poblacion2"
                                    label="2007"
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                type="number"
                                    v-model="poblacion3"
                                    label="2017"
                                ></v-text-field>
                                </v-col>


                                <div class="anio">
                                    <v-col cols="6">
                                            <v-select
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
                                </div>

                            </v-row>
                            </v-container>
                        </v-form>
                    </template>
                </div>


                <section class="py-5">
                    <Dashboard_Otros :anio_in="select" :poblacion1="poblacion1" :poblacion2="poblacion2" :poblacion3="poblacion3" @Limpiar="Limpiar"/>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Dashboard_Otros from './Dashboard_Otros';


    export default {
    name:'Otros',
    data () {
        return {
            poblacion1:null,
            poblacion2:null,
            poblacion3:null,
            select: { state: '2019', abbr: '2019' },
            items: [                
            ],
        }
    },
    methods:{
        Anios: function () {
            for(var i = 2019 ; i <= 2050; i++)
            {
                this.items.push(i,i);               
            }
        },
        Limpiar(){
            this.poblacion1 = null;
            this.poblacion2 = null;
            this.poblacion3 = null;
            this.select = { state: '2019', abbr: '2019' };
        },
        
    },
    mounted(){
        this.Anios()
       
    },
    components:{
        Dashboard_Otros
    }
    
}
</script>

<style scoped>
.anio{
    width: 20%;    
}
@media (max-width: 1000px){
.anio{
        width: 50%;
    }
}

@media (max-width: 800px){
.anio{
    width: 100%;
    }
}
@media (max-width: 600px){
    .anio{
        width: 100%;
    }
}
</style>