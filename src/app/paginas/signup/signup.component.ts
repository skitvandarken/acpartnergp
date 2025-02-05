import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import emailjs,  {type EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-signup',
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, RodapeComponent, TranslatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  translations: any;

  useLanguage(language: string): void {
    this.translate.use(language);
    this.translations.use(language);
}

  partnershipForm: FormGroup;
  selectedPartnership: string = '';

    

  constructor(private fb: FormBuilder, private translate: TranslateService) {

    


    this.partnershipForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      potCliente: ['', Validators.required],
      numColab: ['', Validators.required],
      numeroColaboradores: ['', Validators.required],
      receitaAnual: ['', Validators.required],
      volVendas: ['', Validators.required],
      subsidiariaEscolhida: ['', Validators.required],
      partnershipType: ['', Validators.required],
      paisForm: ['', Validators.required],
      tipoEmpresa: ['', Validators.required],
      nomeEmpresa: ['', Validators.required],
      equipaVendas: ['', Validators.required],
      servicoInteress: ['', Validators.required],
      anosOperacoes: ['', Validators.required],
      businessIndicatorDetails: this.fb.group({
        referralCount: [''],
        keyIndustries: ['']
      }),
      authorizedAgentDetails: this.fb.group({
        region: [''],
        experienceYears: ['']
      }),
      resellerDetails: this.fb.group({
        storeName: [''],
        productSpecialty: ['']
      })
    });

    this.partnershipForm.get('partnershipType')?.valueChanges.subscribe(value => {
      this.selectedPartnership = value;
    });
  }




  public submitForm(e: Event) {

    e.preventDefault();

    emailjs
    .sendForm('service_hxge11t', 'template_52yj2o5', e.target as HTMLFormElement, {
      publicKey: '8zvRzqg96H44z9txo',
      ...this.partnershipForm,


    })
    .then(
      () => {
        this.sucessMessage = true;
        console.log('SUCESSO');
        this.partnershipForm = {

        };

        window.alert('Registo Solicitado com sucesso! 🎉. Caso sua candidatura aceite reberá suas credenciais no e-mail indicado.');
        window.location.href = '';
      },
      (error) => {
        console.log('Falhou...', (error as EmailJSResponseStatus).text);
        window.alert('Não foi possível enviar sua candidatura');
      }
    );


}

}
