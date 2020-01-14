<template>
<div>

  <template>
            <div class="text-center">
                <v-btn class="ma-2" tile color="indigo" dark @click="Llenar">Calcular</v-btn>
                <v-btn class="ma-2" tile outlined color="error" @click="Limpiar2">
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
import { log } from 'util';
    export default {
    props:['anio_in','poblacion1','poblacion2','poblacion3'],
    data: () => ({    
      A:0.00,
      B:0.00,
      Anio:0,
      mostrar:false,
      labels: [
        '1993',
        '2007',
        '2017',        
      ],      
      value: [ 
        0,
        0,
        0              
      ],
    }),
    methods:{
        Ecuacion(T){
              let B,A,Y;
              try {
                B = this.B;
                A = this.A;                               
                Y = (B*T)+A;
              } catch (error) {
                console.log("error: " + error);                
                return 0;
              }

              console.log("recivo el A:> " + A);
              console.log("recivo el B:> " + B);
              console.log("recivo el T:> " + T);
              console.log("SOY LA Y:> " + Y);              
              return Math.round(Y);
        },
        Ecuacion2(T){
          let B,A,Y;
              try {
                B = this.B;
                A = this.A;                               
                Y = Math.pow(Math.E,A) * Math.pow(Math.E, (B*T));
              } catch (error) {
                      
                return 0;
              }
              
              return Math.round(Y);
        },
        LimpiarEvent(){          
         try {
            this.value.length = 0;
          this.labels.length = 0;
          
          this.labels.push('1993');
          this.labels.push('2007');
          this.labels.push('2017');
          //
          this.value.push(parseFloat(this.poblacion1));
          this.value.push(parseFloat(this.poblacion2));
          this.value.push(parseFloat(this.poblacion3));

          this.mostrar = false;    
         

         } catch (error) {
           
         }         
        },
        Limpiar2(){
            this.$emit("Limpiar");
            this.LimpiarEvent();
         },
        Llenar(){    
          let r1, r2;

          if(!this.Validar()){
            this.mostrar = false;
            alert("¡Por favor verifique que todos los campos tengan valor!");
            return;
          }

          r1 = this.PrimeraEcuacion();
          r2 = this.SegundaEcuacion();

         
          
          
          this.LimpiarEvent();
          
          let anio_limit = 2030;
          if(r1>r2){
            this.PrimeraEcuacion();            
              if(this.anio_in >= anio_limit){            
              this.labels.push(this.anio_in.toString());
              this.value.push(this.Ecuacion(this.anio_in));  
              this.mostrar = true;
              return;
          }          

          for(var i= 2019; i<= this.anio_in; i++){            
            this.labels.push(i.toString());
            this.value.push(this.Ecuacion(i));
          } 
          } 
          else{
            this.SegundaEcuacion();
            
              if(this.anio_in >= anio_limit){            
              this.labels.push(this.anio_in.toString());
              this.value.push(this.Ecuacion2(this.anio_in));  
              this.mostrar = true;
              return;
          }          

          for(var i= 2019; i<= this.anio_in; i++){            
            this.labels.push(i.toString());
            this.value.push(this.Ecuacion2(i));
          } 
          }        
           
          this.mostrar = true;          
        },        
        PrimeraEcuacion(){
          
            let cantTiempo = 3;            
            let t1, t2, t3;

            t1 = 1993;
            t2 = 2007;
            t3 = 2017;

            let p1,p2,p3;
            p1 = parseFloat(this.poblacion1);
            p2 = parseFloat(this.poblacion2);
            p3 = parseFloat(this.poblacion3);


            let sumTiempo = (t1+t2+t3);
            let sumPoblacion = (p1+p2+p3);
            let SumTiempoCuadrado = (Math.pow(t1,2) + Math.pow(t2,2) + Math.pow(t3,2));
            let sumPoblacionTiempo = (t1*p1) + (t2*p2) + (t3*p3);

            let mediaSumaTiempo = (sumTiempo/cantTiempo);
            let mediaSumaPoblacion = (sumPoblacion/cantTiempo);

          

            let B = ((3 * sumPoblacionTiempo) - (sumPoblacion * sumTiempo)) / ((3 * SumTiempoCuadrado) - Math.pow(sumTiempo,2));            
            let A = mediaSumaPoblacion - B * mediaSumaTiempo;
            this.B = B;
            this.A = A;
             //de aqui para arriba esta bien
            
            let pronostico1, pronostico2, pronostico3;
            pronostico1 = A + (B*t1);
            pronostico2 = A + (B*t2);
            pronostico3 = A + (B*t3);

            let estimado1 = Math.pow((pronostico1 - mediaSumaPoblacion), 2);
            let estimado2 = Math.pow((pronostico2 - mediaSumaPoblacion), 2);
            let estimado3 = Math.pow((pronostico3 - mediaSumaPoblacion), 2);


            let real1, real2, real3;
            real1 = Math.pow(p1- mediaSumaPoblacion,2);
            real2 = Math.pow(p2- mediaSumaPoblacion,2);
            real3 = Math.pow(p3- mediaSumaPoblacion,2);

            let sumEstimados, sumReales;
            sumEstimados = (estimado1+estimado2+estimado3);
            sumReales = (real1 + real2 + real3);

            let R;
            R = sumEstimados/sumReales;
            return R;
        },
        SegundaEcuacion(){
            let cantTiempo = 3;            
            let t1, t2, t3;

            t1 = 1993.00;
            t2 = 2007.00;
            t3 = 2017.00;

            let p1,p2,p3;

            p1 = parseFloat(this.poblacion1);
            p2 = parseFloat(this.poblacion2);
            p3 = parseFloat(this.poblacion3);

            let sumTiempo = (t1+t2+t3);
            let sumPoblacion = (p1+p2+p3);


            let LogaritmoPoblacion1 = Math.log(p1);
            let LogaritmoPoblacion2 = Math.log(p2);
            let LogaritmoPoblacion3 = Math.log(p3);
            


            let MultiplicacionLog1Tiempo1 = LogaritmoPoblacion1 * t1;
            let MultiplicacionLog2Tiempo2 = LogaritmoPoblacion2 * t2;
            let MultiplicacionLog3Tiempo3 = LogaritmoPoblacion3 * t3;
            
         

            let SumLogaritmos = (LogaritmoPoblacion1+LogaritmoPoblacion2+LogaritmoPoblacion3);
            let SumaMultiplicacionLogTiempo = (MultiplicacionLog1Tiempo1 + MultiplicacionLog2Tiempo2 + MultiplicacionLog3Tiempo3);
            



            let SumTiempoCuadrado = (Math.pow(t1,2) + Math.pow(t2,2) + Math.pow(t3,2));
            let sumLogPoblacion = (LogaritmoPoblacion1 + LogaritmoPoblacion2 + LogaritmoPoblacion3);

            let mediaSumaTiempo = (sumTiempo/cantTiempo);
            let mediaLogPoblacion = (sumLogPoblacion/cantTiempo);


            let B = ((3 * SumaMultiplicacionLogTiempo) - SumLogaritmos * sumTiempo) / ((3*SumTiempoCuadrado)-Math.pow(sumTiempo,2));
            let A = mediaLogPoblacion - B * mediaSumaTiempo;
            this.B = B;
            this.A = A;
            //de aqui para arriba esta bien
            
            let pronostico1, pronostico2, pronostico3;
            pronostico1 = A + (B*t1);
            pronostico2 = A + (B*t2);
            pronostico3 = A + (B*t3);

            let estimado1 = Math.pow(pronostico1- mediaLogPoblacion, 2);
            let estimado2 = Math.pow(pronostico2- mediaLogPoblacion, 2);
            let estimado3 = Math.pow(pronostico3- mediaLogPoblacion, 2);


            let real1, real2, real3;
            real1 = Math.pow(LogaritmoPoblacion1- mediaLogPoblacion, 2);
            real2 = Math.pow(LogaritmoPoblacion2- mediaLogPoblacion, 2);
            real3 = Math.pow(LogaritmoPoblacion3- mediaLogPoblacion, 2);

            let sumEstimados, sumReales;
            sumEstimados = (estimado1+estimado2+estimado3);
            sumReales = (real1 + real2 + real3);

            let R;
            R = sumEstimados/sumReales;
            return R;
        },
        Validar(){
          
            let valor = parseInt(this.anio_in);
            let a1,a2,a3;
            a1 = parseInt(this.poblacion1);
            a2 = parseInt(this.poblacion2)
            a3 = parseInt(this.poblacion3)
            if(isNaN(valor) || isNaN(a1) || isNaN(a2) || isNaN(a3))
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