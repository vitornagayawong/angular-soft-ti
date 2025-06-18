import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contatos.component.html',
})
export class ContatosComponent {
  formContato: FormGroup;
  contatos: any[] = [];
  editandoId: string | null = null;
  urlDefault: string = 'http://localhost:3333/contatos';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formContato = this.fb.group({
      title: [''],
      description: ['']
    });

    this.carregarContatos();
  }

  carregarContatos() {
    this.http.get<any[]>(this.urlDefault).subscribe(data => {
      this.contatos = data;
    });
  }

  salvar() {
    const contato = this.formContato.value;

    if (this.editandoId) {
      this.http.put(this.urlDefault + '/' + this.editandoId, contato).subscribe(() => {
        this.editandoId = null;
        this.formContato.reset();
        this.carregarContatos();
      });
    } else {
      this.http.post(this.urlDefault, contato).subscribe(() => {
        this.formContato.reset();
        this.carregarContatos();
      });
    }
  }

  editar(contato: any) {
    this.editandoId = contato.id;
    this.formContato.setValue({
      title: contato.title,
      description: contato.description
    });
  }

  deletar(id: string) {
    this.http.delete(this.urlDefault + '/' + id).subscribe(() => {
      this.carregarContatos();
    });
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.formContato.reset();
  }
}
