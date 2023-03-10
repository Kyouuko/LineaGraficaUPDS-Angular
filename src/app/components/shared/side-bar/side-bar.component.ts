import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';


//? Temporaly MenuInterface
//? May change due backend response, Menu is created dynamically
interface MenuItem{
  routerLink: string;
  title: string;
  icon: string
}


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() menus: MenuItem[] = [];
  @Output() aplicarCambios: EventEmitter<void> = new EventEmitter<void>()
  @Output() cambiarModoEvent: EventEmitter<void> = new EventEmitter<void>()

  tema: string = 'light';
  modoOscuro = false;

  funcionario: any = {};

  constructor(private router: Router, private mainS: MainService) {
    // this.getPerfil().then((resp: any) => {
    //   if(resp == "error") this.logOut();
    // });
  }

  ngOnInit(): void {
    if (localStorage.getItem('theme') == 'dark') {
      this.tema = 'dark';
      this.modoOscuro = true;
    }

    //? Overwriting default value of menus
    this.menus = [
      {
        routerLink: "/",
        title: "Estatutos y Reglamentos",
        icon: "bi bi-journal-bookmark-fill"
      },
      {
        routerLink: "/",
        title: "Solicitud de licencia",
        icon: "bi bi-file-medical-fill"
      },
      {
        routerLink: "/",
        title: "Lista de Utiles Escolares",
        icon: "bi bi-list-task"
      },
      {
        routerLink: "/",
        title: "Horario de Clases",
        icon: "bi bi-alarm-fill"
      },
      {
        routerLink: "/",
        title: "Citaciones",
        icon: "bi bi-send-check-fill"
      },
      {
        routerLink: "/",
        title: "Planificación curricular",
        icon: "bi bi-file-ruled-fill"
      },
      {
        routerLink: "/",
        title: "Pagos",
        icon: "bi bi-file-ruled-fill"
      },
      {
        routerLink: "/",
        title: "Postulacion",
        icon: "bi bi-file-ruled-fill"
      },
      {
        routerLink: "/",
        title: "Lista de postulacion",
        icon: "bi bi-file-ruled-fill"
      },
      {
        routerLink: "/",
        title: "Lista de familiares",
        icon: "bi bi-file-ruled-fill"
      },
      {
        routerLink: "/",
        title: "Familiar",
        icon: "bi bi-file-ruled-fill"
      }
    ];

  }
  
  toggleOff(){
    this.aplicarCambios.emit();
  }

  logOut(){
    localStorage.removeItem('Authorization');
    this.router.navigateByUrl('/login');
  }

  cambiarModo(){
    // this.aplicarCambios.emit();
    this.modoOscuro = this.tema == 'light' ? false : true;
    this.mainS.modoOscuro.next(this.modoOscuro);
  }

  async getPerfil() {
    let response: any = await this.mainS.getPerfil();
    
    this.funcionario = response;
    return response;
  }

}
