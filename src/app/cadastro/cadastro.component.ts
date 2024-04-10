import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../services/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  endereco: string = "";

  constructor(
      private router: Router,
      private consultaCepService: ConsultaCepService
    ){ }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid) {
      this.router.navigate(['./sucesso']);
    } else {
      alert('Formulário inválido');
    }
  }

  consultarCep(ev: any, f: NgForm) {
    const cep = ev.target.value;
    
    if(cep) {
      this.consultaCepService.getConsultaCep(cep).subscribe((resultado) => {
        this.popularEndereco(resultado, f);
      }); 
    }
  }

  popularEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })    
  }
}
