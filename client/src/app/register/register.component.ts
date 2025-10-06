import { Component, inject, input, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private toastr = inject(ToastrService)
  private accountService = inject(AccountService);
  model : any = {};

 cancelRegister = output<boolean>();

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response)
        this.cancel();
      },
      error: err => this.toastr.error(err.error)
      ,
      complete:() => console.log("register completed")
    })
  }

  cancel(){
 this.cancelRegister.emit(false);
 }



}
