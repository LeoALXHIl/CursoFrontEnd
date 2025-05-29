import { Component, OnInit } from '@angular/core';
import { vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss']
})
export class PainelVagasComponent implements OnInit {
  public vaga: vaga = new vaga(0, "", "", "", 0); // restreia os dados do formulario pro interpolação
  public vagas: vaga[] = [];
  //armazenar os dados da api -json

  constructor(private _vagasService: VagasService) {} // corrigido nome do parâmetro

  ngOnInit(): void {
    this.listarVagas();
  }
// listar todas as vagas no servidor
  listarVagas() {
    this._vagasService.getVagas().subscribe(
      (retornaVaga) => {
        this.vagas = retornaVaga.map((item) => {
          return new vaga(
            item.id,
            item.nome,
            item.foto,
            item.descricao,
            item.salario
          );
        });
      }
    );
  }
  //listar uma unica vaga
  listarVagaUnica(vaga:vaga){
    // Função para listar vaga unica, para edição do formulário
    this.vaga = vaga
    // A vaga clicada é mostrada no formulario =>
  }

  // cadastrar vagas 
  cadastrar(){
    this._vagasService.cadastrarVaga(this.vaga).subscribe(
      ()=>{
        this.vaga = new vaga(0,"","","",0);//limpara os campos do formulário
        this.listarVagas();
        alert("Vaga Cadastrada com sucesso")
      }, (err) => {console.error("Exception: ",err);}
    );
  }
  // atualizar vagas
  Atualizar(id: any) {
    this._vagasService.atualizarVaga(id, this.vaga).subscribe(
      () => {
        this.vaga = new vaga(0, "", "", "", 0); //limpar os campos do formulário
        this.listarVagas();
        alert("Vaga atualizada com sucesso");
      },
      (err) => {console.error("Exception: ",err);}
    );
  }
  

  //deletar vagas

excluir(id:any){
  this._vagasService.removerVaga(id).subscribe(
    ()=>{this.listarVagas();alert("Vaga Deletada com Sucesso!")},
   (err) => {console.error("Exception: ",err);} 
  );


}}

