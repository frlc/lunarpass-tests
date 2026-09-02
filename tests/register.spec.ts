import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { Navbar } from '../pages/components/navbar'
import { faker } from '@faker-js/faker'
import { Mission, Login } from '../support/mission'
import { DashPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'
import { Toast } from '../pages/components/toast'



let loginPage: LoginPage
let navbar: Navbar
let dashPage: DashPage
let registerPage: RegisterPage
let toast: Toast

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  navbar = new Navbar(page)
  dashPage = new DashPage(page)
  registerPage = new RegisterPage(page)
  toast = new Toast(page)

  //Arrange: Acessar a página de login  
  await loginPage.navigate()
  
})

test('deve cadastrar uma nova missão', async ({ page }) => {

  const login: Login = {
    email: 'buzz@lunarpass.dev',
    password: 'pwd123'
  }  

  const mission: Mission = {
    id: 'LP-' + faker.string.alphanumeric({length: { min: 5, max: 5 }, casing: 'upper'}),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: 1000
  } 

  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login(login.email, login.password)
  await expect(navbar.logoutButton).toBeVisible({timeout: 5_000})

  await dashPage.newMissionButton.click()
  await expect(registerPage.h2ProgramarMissao).toBeVisible()
  await registerPage.submitMissionForm(mission)
  await expect(toast.toastMessage).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})