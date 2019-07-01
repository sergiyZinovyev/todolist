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
    {
      id: 'date of creation',
      ukr: 'дата створення'
    },
    {
      id: 'date of execution',
      ukr: 'дата виконання'
    },
    {
      id: 'priority',
      ukr: 'приоритет'
    },
    {
      id: 'discription',
      ukr: 'опис'
    },
    {
      id: 'done',
      ukr: 'стан виконання'
    },
    {
      id: 'Low',
      ukr: 'Низький'
    },
    {
      id: 'Normal',
      ukr: 'Нормальний'
    },
    {
      id: 'High',
      ukr: 'Високий'
    },
    {
      id: 'Task',
      ukr: 'Завдання'
    },
    {
      id: 'Todo',
      ukr: 'Списки завдань'
    },
    {
      id: 'Creation',
      ukr: 'Створення'
    },
    {
      id: 'Execution',
      ukr: 'Виконання'
    },
    {
      id: 'Add new task to',
      ukr: 'Додати нове завдання у'
    },
    {
      id: 'list',
      ukr: 'список'
    },
    {
      id: 'name',
      ukr: "ім'я"
    },
    {
      id: 'more settings...',
      ukr: 'більше налаштувань...'
    },
    {
      id: 'Add task',
      ukr: 'Додати завдання'
    },
    {
      id: 'Sort data',
      ukr: 'Сортувати'
    },
    {
      id: 'Priority',
      ukr: 'Приоритет'
    },
    {
      id: 'Edit',
      ukr: 'Редагувати'
    },
    {
      id: 'Delete',
      ukr: 'Видалити'
    },
    {
      id: 'Start now!',
      ukr: 'Почни зараз!'
    },
    {
      id: 'Create your task lists and add new tasks.',
      ukr: 'Створюй свої списки задач та додавай до них нові завдання'
    },
    {
      id: 'Go to the menu and create your first To-Do.',
      ukr: 'Перейдіть у меню та створіть свій перший список задач'
    },
    {
      id: 'Get start',
      ukr: 'Розпочати'
    },
    {
      id: 'All tasks',
      ukr: 'Всі завдання'
    },
    {
      id: 'color',
      ukr: 'колір'
    },
    {
      id: 'Add todo',
      ukr: 'Додати список завдань'
    },
    {
      id: 'List of ToDo',
      ukr: 'Перелік списків завдань'
    },
    {
      id: 'Get all To-Do',
      ukr: 'Отримати всі завдання'
    },
    {
      id: 'Add new ToDo',
      ukr: 'Додати новий список завдань'
    }
  ]



}