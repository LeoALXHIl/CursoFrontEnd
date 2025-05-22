export class vaga {

// forma encurtada da criação de classes
constructor(
        public id:number,
        public nome:string,
        public foto:string,
        public descricao: string,
        public salario: number,
        
        
        
        ){}


        toMap(): {[key:string]:any}{
          return{
            id: this.id,
            nome: this.nome,
            foto: this.foto,
            descricao: this.descricao,
            salario: this.salario,
          }
        }

        fromMap(map:any):vaga{
          return new vaga(
            map.id,
            map.nome,
            map.foto,
            map.descricao,
            map.salario,
          )
        }




    // forma classica de criacao de classes
    //atributos
  //  id: number =0;
  //  nome: string ="";
  //  foto: string = "";
  //  descricao: string="";
  //  salario: number=0;

//constructor(id: number, nome: string, foto: string, descricao: string, salario: number) {
   // this.id = id;
   // this.nome = nome;
   // this.foto = foto;
   // this.descricao = descricao;
  
    
   // this.salario = salario;
//}
//getter and setter uso quando os atributos forem privados 
//getId():number{
 //   return this.id;
//}
//setId(id:number): void{
 //   this.id = id
//}
}
