/*
Atención de animales
En un campo hay que atender a los animales, que tienen varias necesidades. Consideremos vacas, gallinas y cerdos, que tienen estas carácterísticas:

Vaca
-Cuando come aumenta el peso en lo que comió / 3 y le da sed.
-Cuando bebe se le va la sed y pierde 500 g de peso.
-Conviene vacunarla una vez, o sea, si no se la vacunó conviene vacunarla, y si ya se la vacunó no conviene volverla a vacunar.
-Tiene hambre si pesa menos de 200 kg.                    
-Cada tanto se la lleva a caminar, en cada caminata pierde 3 kg..

Cerdo
-Cuando come aumenta el peso en lo que comió – 200 g (si come menos de 200 g no aumenta nada); si come más de 1 kg se le va el hambre, si no, no.
-Quiero saber, para cada cerdo, cuánto comió la vez que más comió.
-Siempre conviene vacunarlo.
-Cuando bebe se le va la sed, y le da hambre.
-Si come más de tres veces sin beber le da sed.

Gallina                    
-Cuando come no se observa ningún cambio, siempre pesa 4 kg.
-Siempre tiene hambre, nunca tiene sed, nunca conviene vacunarla.
-Quiero saber, para una gallina, cuántas veces fue a comer.
-Como se ve, importa cuánto come un animal cuando come (excepto para las gallinas), pero no cuánto bebe cuando bebe.

Hay varios dispositivos de atención automática a los animales:
Comederos normales:
-Cada comedero da de comer una cantidad fija que varía para cada comedero.
-Puede atender a los animales con hambre que pesen menos de lo que soporta el comedero, que también es un valor que depende del comedero. 
-Un comedero normal necesita recarga si le quedan menos de 10 raciones, cuando se lo recarga se le cargan 30 raciones.

Comederos inteligente: 
-Le dan de comer a un animal su peso / 100.
-Pueden atender a cualquier animal con hambre. 
-Un comedero inteligente necesita recarga si le quedan menos de 15 kg, al recargarlo se lo lleva hasta su capacidad máxima (que se indica para cada comedero). 

Bebederos:
-Dan de beber a un animal, pueden atender a los animales con sed. 
-Un bebedero necesita recarga cada 20 animales que atiende, 
-Al recargarlo no se registra en el sistema (sí que se lo recarga para volver a contar desde ahí 20 animales atendidos). 

Vacunatorios: 
-Vacunan a un animal
-Pueden atender a los animales que conviene vacunar.
-Un vacunatorio necesita recarga si se queda sin vacunas, al atenderlo se le recargan 50 vacunas.

Una estación de servicio tiene 3 dispositivos de atención automática.

Modelar lo que se describió de forma tal de poder
Saber si un animal puede ser atendido por una estación de servicio; o sea, si se lo puede atender en alguno de sus dispositivos.
Indicar que un animal se atiende en una estación, en este caso se elige un dispositivo al azar que pueda atenderlo, y se lleva al animal a ese dispositivo para que lo atienda. 
Saber para un cerdo cuánto comió la vez que más comió. 
Recargar los dispositivos que necesitan recarga en una estación de servicio.
*/
class Animales{
    constructor(peso){
        this.peso = peso;
        this.hambre = true;
        this.sed = true;
        this.vacunado = false;
    }
    darBeber(){
        this.sed = false
        console.log("El animal bebió")
    }
    vacunar(){
        this.vacunado = true;
        console.log("El animal ha sido vacunado")
        this.mostrarAnimal()
    }
    mostrarAnimal(){
        console.log(this)
    }
}
class Vaca extends Animales{
    constructor(peso){
        super(peso);
    }
    alimentar(gramos){
        if(this.peso <= 199999){
            this.peso += (gramos / 3)
            this.sed = true
            console.log("La vaca fue alimentado con " + gramos/3 + " gramos de comida")
            super.mostrarAnimal()
        }else console.log("La vaca no tiene hambre")
    }
    darBeber(){
        super.darBeber()
        this.peso -= 500
        super.mostrarAnimal()
    }
    vacunar(){
        if(this.vacunado == false){
            super.vacunar()
        }else console.log("La vaca ya fue vacunada anteriormente")
    }
    darcaminata(){
        this.peso -= 3000
        console.log("La vaca fué a caminar")
        super.mostrarAnimal()
    }
}
class Cerdo extends Animales{
    constructor(peso){
        super(peso);
        this.registroAlimento = 0;
        this.registroAlimentoSinBebida = 0;
    }
    alimentar(gramos){
        if(gramos >= 200){
            this.peso += (gramos - 200)
            this.registroAlimentoSinBebida += 1
            console.log("El cerdo fue alimentado con " + (gramos-200) + " gramos de comida")
            if(gramos >= 1000) this.hambre = false
            super.mostrarAnimal()
            this.sed = this.registroAlimentoSinBebida >= 3
            if(this.registroAlimento <= gramos){
            this.registroAlimento = gramos
            }
        }else console.log("El cerdo no subió de peso ya que consumió menos de 200 gramos")
    }
    darBeber(){
        if(this.sed){
        super.darBeber()
        this.hambre = true
        super.mostrarAnimal()
        }else console.log("El cerdo no tiene sed")
    }
    mostrarVezMasAlimentado(){
        console.log("La vez que mas alimento comió el cerdo es de: " + this.registroAlimento + " gramos")
    }
}
class Gallina extends Animales{
    constructor(){
        super(4000);
        this.sed = false
        this.registroVecesALimentado = 0;
    }
    alimentar(gramos){
        this.registroVecesALimentado += 1
        console.log("La gallina fué alimentada con " + gramos + " gramos de comida pero su su peso actual siempre es de: " + this.peso)
    }
    darBeber(){
        console.log("La gallina nunca tiene sed")
    }
    vacunar(){
        console.log("No conviene vacunar a la gallina")
    }
    mostrarAlimentosGallina(){
        console.log("La gallina fué alimentada " + this.registroVecesALimentado + " veces") 
    }
}
class Estaciones{
    constructor(pesoSoporte = 500000){
       // this.pesoSoporte = pesoSoporte;
    }
    mostrarRecarga(){
        console.log("La estación se ha recargado")
    }
    mostrarEstacion(){
        console.log(this)
    }
}
class ComederoNormal extends Estaciones{
    constructor(pesoSoporte){
        super(pesoSoporte);
        this.raciones = 4;
        this.gramos = 5000;
    }
    alimentarAnimal(animal){
        if(animal.peso <= this.pesoSoporte){
            animal.alimentar(this.gramos)
            this.raciones -= 1
            super.mostrarEstacion()
        }else console.log("El peso del animal supera el peso del soporte o el animal no tiene hambre")
    }
    recargarEstacion(){
        if(this.raciones <= 9){
            this.raciones += 30
            super.mostrarRecarga()
            super.mostrarEstacion()
        }else console.log("La estación aún cuenta con suficientes raciones")
    }
}
class ComederoInteligente extends Estaciones{
    constructor(pesoSoporte){
        super(pesoSoporte);
        this.capacidadMaxima = 50000;
        this.cantidadAlimento = this.capacidadMaxima;
        this.alimento = 0;
    }
    alimentarAnimal(animal){
        this.alimento = animal.peso/100
        if(this.cantidadAlimento >= this.alimento){
            animal.alimentar(this.alimento)
            this.cantidadAlimento -= this.alimento
            super.mostrarEstacion()
        }else console.log("No hay suficiente alimento para alimentar al animal")
    }
    recargarEstacion(){
        if(this.cantidadAlimento <= 14999){
            this.cantidadAlimento = this.capacidadMaxima
            super.mostrarRecarga()
            super.mostrarEstacion()
        }else console.log("La estación aún cuenta con suficiente alimento")
    }
}
class Bebedero extends Estaciones{
    constructor(pesoSoporte){
        super(pesoSoporte);
        this.bebidas = 10;
    }
    darBeberAnimal(animal){
        if(this.bebidas >= 1){
            if(animal.sed){
                animal.darBeber()
                this.bebidas -= 1
                super.mostrarEstacion()
            }else console.log("El animal no tiene sed")
        }else console.log("No hay bebidas disponibles")
    }
    recargarBebedero(){
        if(this.bebidas <= 0){
            this.bebidas += 20
            super.mostrarRecarga()
            super.mostrarEstacion()
        }else console.log("El bebedero aún cuenta con suficientes bebidas")
    }
}
class Vacunatorio extends Estaciones{
    constructor(pesoSoporte){
        super(pesoSoporte);
        this.vacunas = 10;
    }
    vacunarAnimal(animal){
        if(this.vacunas >= 1){
            if(animal.vacunado == false){
                animal.vacunar()
                this.vacunas -= 1
                super.mostrarEstacion()
            }else console.log("No conviene vacunar al animal")
        }else console.log("No hay vacunas disponibles")
    }
    recargarVacunatorio(){
        if(this.vacunas <= 0){
            this.vacunas += 50
            super.mostrarRecarga()
            super.mostrarEstacion()
        }else console.log("El vacunatorio aún cuenta con suficientes vacunas")
    }
}
var vacaChira = new Vaca(200000);
var cerdoManuelCabral = new Cerdo(30000);
var gallinaSansa = new Gallina();
var comederoNormal = new ComederoNormal();
var comederoInteligente = new ComederoInteligente();
var bebedero = new Bebedero();
var vacunatorio = new Vacunatorio();

vacaChira.mostrarAnimal()
vacaChira.alimentar(5000)
vacaChira.darBeber()
vacaChira.vacunar()
vacaChira.darcaminata()

cerdoManuelCabral.mostrarAnimal()
cerdoManuelCabral.alimentar(1500)
cerdoManuelCabral.darBeber()
cerdoManuelCabral.vacunar()
cerdoManuelCabral.mostrarVezMasAlimentado()

gallinaSansa.mostrarAnimal()
gallinaSansa.alimentar(1500)
gallinaSansa.darBeber()
gallinaSansa.vacunar()
gallinaSansa.mostrarAlimentosGallina()

comederoNormal.mostrarEstacion()
comederoNormal.alimentarAnimal(vacaChira)
comederoNormal.alimentarAnimal(cerdoManuelCabral)
comederoNormal.alimentarAnimal(gallinaSansa)
comederoNormal.recargarEstacion()

comederoInteligente.mostrarEstacion()
comederoInteligente.alimentarAnimal(vacaChira)
comederoInteligente.alimentarAnimal(cerdoManuelCabral)
comederoInteligente.alimentarAnimal(gallinaSansa)
comederoInteligente.recargarEstacion()

bebedero.mostrarEstacion()
bebedero.darBeberAnimal(vacaChira)
bebedero.darBeberAnimal(cerdoManuelCabral)
bebedero.darBeberAnimal(gallinaSansa)
bebedero.recargarBebedero()

vacunatorio.mostrarEstacion()
vacunatorio.vacunarAnimal(vacaChira)
vacunatorio.vacunarAnimal(cerdoManuelCabral)
vacunatorio.vacunarAnimal(gallinaSansa)
vacunatorio.recargarVacunatorio()