import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Dados } from 'src/app/model/Dados';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {

  valueD = {
    valorDiastolica : 0,
    valorSistolica : 0,
    valorPulso : 0,
    isDeitado :false
  }

  constructor(public modalController: ModalController, public dadoService:DatabaseService, public alertController: AlertController) {}
 
  ngOnInit(): void {
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public getValor(valor, name){
    this.valueD[name] = valor.detail.value;
  }

  public salvarRegistro(){
    let dado:Dados = new Dados();
    dado.sistolica = this.valueD['valorSistolica'],
    dado.diastolica = this.valueD['valorDiastolica'],
    dado.pulso = this.valueD['valorPulso'],
    dado.posicao = this.valueD['isDeitado'] ? 'Deitado' : 'Sentado',
    dado.data = new Date();
    this.dadoService.insert(dado);
    this.dismiss();
  }

  private validarDados(dado:Dados){
    if(!dado.sistolica){
      this.presentAlert('Sistólica');
    }
    if(!dado.diastolica){
      this.presentAlert('Diastólica');
    }
    if(!dado.pulso){
      this.presentAlert('Pulso');
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Formulário inválido',
      message: 'Preencha o campo ' + message + ' para continuar.' ,
      buttons: ['OK']
    });

    await alert.present();
  }


}
