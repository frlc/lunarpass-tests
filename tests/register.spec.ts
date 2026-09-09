import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { Navbar } from '../pages/components/navbar'
import { faker } from '@faker-js/faker'
import { Mission, Login } from '../support/types'
import { DashPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'
import { Toast } from '../pages/components/toast'
import { insertMission, deleteMissionById, deleteReservationById, deleteTicketById } from '../support/db'



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
    baseId: 'aurora',
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

test('não deve cadastrar com código de missão incorreto', async ({ page }) => {

  const login: Login = {
    email: 'buzz@lunarpass.dev',
    password: 'pwd123'
  }  

  const mission: Mission = {
    id: faker.string.alphanumeric({length: { min: 5, max: 5 }, casing: 'upper'}),
    rocket: 'Starship',
    baseId: 'aurora',
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
  await expect(registerPage.errorMessageIdFormat).toContainText('Use o formato LP-0000')
})

test('não deve cadastrar com código de missão duplicado', async ({ page }) => {
//Arrange: Inserir missão no banco de dados
  const login: Login = {
    email: 'buzz@lunarpass.dev',
    password: 'pwd123'
  }  

  const mission: Mission = {
    id: 'LP-DUP01',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '2028-01-27',
    price: 1000
  } 

  const returnDate ='27 de jan. de 2028'

  await deleteTicketById(mission.id)
  await deleteReservationById(mission.id)
  await deleteMissionById(mission.id)
  await insertMission(mission)

  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login(login.email, login.password)
  await expect(navbar.logoutButton).toBeVisible({timeout: 5_000})

  await dashPage.newMissionButton.click()
  await expect(registerPage.h2ProgramarMissao).toBeVisible()
  mission.returnDate = returnDate
  await registerPage.submitMissionForm(mission)

  //Assert: Verificar se a mensagem de erro é exibida
  await expect(registerPage.errorMessageIdFormat).toContainText('Já existe uma missão com este ID.')
})