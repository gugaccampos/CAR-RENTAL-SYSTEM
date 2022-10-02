import { Component, Injectable, OnInit } from '@angular/core';
import { ParamMap, Route, ActivatedRoute, Router } from '@angular/router';
import { CarService, CarType, FeedbackType } from '../car.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FeedbackPageComponent implements OnInit {

  constructor(private route: Router,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private routeActivated: ActivatedRoute) { }
  notas: number[] = [1,2,3,4,5]
  imagem = 'assets/carro2.png'
  navigate_to_home_page(){
    this.route.navigate([''])

  }
  feedbackForm = this.formBuilder.group({
    avaliacao: 0,
    descricao: ''
  })

  getFeedbackCar(car: CarType) {
    this.imagem = car.imagem
  }
  newCar: CarType = {
    id: 0,
    marca: '',
    nome: '',
    ano: 2022,
    direcao: '',
    imagem: '',
    categoria: '',
    totAssentos: '',
    cambio: '',
    tipoCombustivel: '',
    tamanhoMala: '',
    preco: 0,
    quantidade_disponivel: 0,
    feedbacks: []
  }

  id = 0
  ngOnInit(): void {
    this.id = +this.routeActivated.snapshot.paramMap.get('id')!
    this.getFeedbackCar(this.carService.getCar(Number(this.id))!)
  }

  isClient = this.authService.isClient;
  isAdmin = this.authService.isAdmin;

  onSubmit() {
    console.log(this.feedbackForm.value.avaliacao!);
    console.log(this.feedbackForm.value.descricao!);
    console.log(this.authService.clientName);


    let newFeedback: FeedbackType = {
      nome: this.authService.clientName,
      nota: Number(this.feedbackForm.value.avaliacao!),
      descricao: this.feedbackForm.value.descricao!
    }


    this.carService.addFeedback(this.newCar.id, newFeedback)
    this.feedbackForm.reset();
    this.route.navigate(['/carhistory'])
  }

}
