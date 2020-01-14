<template>
<div>

  <template>
            <div class="text-center">
                <v-btn class="ma-2" tile color="indigo" dark @click="Llenar">Calcular</v-btn>
                <v-btn class="ma-2" tile outlined color="error" @click="LimpiarEvent">
                <v-icon left>mdi-delete</v-icon> Limpiar
                </v-btn>
            </div>
  </template>

  <template>
    <v-card v-if="mostrar"
    class="mt-10 mx-auto"
    max-width="1000"
    >
    <v-sheet
    class="v-sheet--offset mx-auto"
    color="cyan"
    elevation="12"
    max-width="calc(100%-32px)"
    >
    <v-sparkline
    :labels="labels"
    :value="value"
    color="black"
    line-width="2"
    padding="16"
    >
    </v-sparkline>
    </v-sheet>



    <v-card-text class="p-0">
      <div class="title font-weight-light mb-2">Resultado hasta el año <b>{{anio_in}}</b></div>
      <div class="display-1 subheading font-weight-light grey--text"><b>{{value[value.length-1]}} habitantes</b></div>
      
    </v-card-text>
    </v-card>
  </template>

            
</div>

</template>

<script>
import { ALPN_ENABLED, SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import { log, isNull } from 'util';
    export default {
    props:['anio_in'],
    data: () => ({      
      Anio:0,
      mostrar:false,
      labels: [
        '1993',
        '2007',
        '2017',        
      ],
      value: [
        25707,
        28681,
        29963,         
      ],
    }),
    methods:{
        Ecuacion(T){
              let B,A,Y;
              try {
                B = 179.58715596330276;
                A = -332074.97247706424;                               
                Y = (B*T)+A;
              } catch (error) {
                console.log("error: " + error);                
                return 0;
              }              
              return Math.round(Y);
        },
        LimpiarEvent(){          
          this.value.length = 0;
          this.labels.length = 0;
          
          this.labels.push('1993');
          this.labels.push('2007');
          this.labels.push('2017');
          //
          this.value.push(25707);
          this.value.push(28681);
          this.value.push(29963);

          this.mostrar = false
        },
        Llenar(){    
          
          this.LimpiarEvent();
          if(!this.Validar()){
            this.mostrar = false;
            alert("¡Por favor seleccione el año a calcular!");
            return;
          }
          let aniox = parseFloat(this.anio_in);
          
          
          let anio_limit = 2030;           
          if(aniox >= anio_limit){            
              this.labels.push(aniox.toString());
              this.value.push(this.Ecuacion(aniox));  
              this.mostrar = true;
              return;
          }          

          for(var i= 2019; i<= aniox; i++){            
            this.labels.push(i.toString());
            this.value.push(this.Ecuacion(i));
          }          
          this.mostrar = true;          
        },
        Validar(){
          
            let valor = parseInt(this.anio_in);
            if(isNaN(valor))
              return false;
            else return true;

        }
         
    },

    mounted(){
     
      
    },
    watch:{
      
    }
     
}
</script>

<style lang="scss" scoped>
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>