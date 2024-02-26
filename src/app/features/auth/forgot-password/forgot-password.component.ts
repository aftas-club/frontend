import { Component } from '@angular/core';
import {AuthLayoutComponent} from "../../../layout/auth-layout/auth-layout.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthLayoutComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

}
