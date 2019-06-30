import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }


  dictionary: {id: string, ukr: string}[] = [
    {
      id: 'Achieve the unattainable!',
      ukr: 'Досягни недосяжне!'
    },
    {
      id: 'Set unachievable goals and achieve them. Create an unlimited number of task lists and manage them all at the same time',
      ukr: 'Встановюйте недосяжні цілі та досягайте їх. Створюйте необмежену кількість списків завдань та керуйте ними одночасно'
    },
    {
      id: 'Sign in',
      ukr: 'Вхід'
    },
    {
      id: 'Sign up',
      ukr: 'Реєстрація'
    },
    {
      id: 'Dashboard',
      ukr: 'Меню'
    },
    {
      id: 'Login',
      ukr: 'Вхід'
    },
    {
      id: 'Registration',
      ukr: 'Реєстрація'
    },
    {
      id: 'Logout',
      ukr: 'Вихід'
    },
    {
      id: 'en',
      ukr: 'анг'
    },
    {
      id: 'ukr',
      ukr: 'укр'
    },
    {
      id: 'Email',
      ukr: 'Електронна пошта'
    },
    {
      id: 'Password',
      ukr: 'Пароль'
    },
  ]



}