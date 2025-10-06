import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-error',
  imports: [],
  templateUrl: './service-error.component.html',
  styleUrl: './service-error.component.css'
})
export class ServiceErrorComponent {
error: any ;

constructor(private router:Router ){
  const navigation = this.router.getCurrentNavigation();
  this.error = navigation?.extras?.state?.['error'];
}
}
