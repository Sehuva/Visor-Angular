import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Global } from '@shared/utility/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private global: Global,
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['user@minka.com.pe', Validators.required],
      password: ['123', Validators.required]
    });
  }

  async submitForm() {
    if (!this.global.validForm(this.loginForm, 'Por favor ingresar el usuario y contraseña.')) {
      return;
    }

    this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.setItem('user', JSON.stringify({ name: 'Minka', userName: 'Minka Pac Admin' }));
    this.loading = false;
    this.router.navigate(['/home']);
  }
}
