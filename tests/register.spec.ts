import { test, expect } from '../support'
import { faker } from '@faker-js/faker'
import { Mission, Login } from '../support/types'
import { insertMission, cleanMissionData } from '../support/db'
import { formatDate } from '../support/helpers'

test.beforeEach(async ({ app }) => {
  //Arrange Before Each: Acessar a página de login
  await app.loginPage.navigate()
})

test('deve cadastrar uma nova missão', async ({ app }) => {

  const login: Login = {
    email: 'buzz@lunarpass.dev',
    password: 'pwd123'
  }  

  const mission: Mission = {
    id: 'LP-0128F',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: 1000
  }
  
  //Arrange: Deletar missão, reserva e ticket caso já existam no banco de dados
  await cleanMissionData(mission)

  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login(login.email, login.password)
  await expect(app.navbar.logoutButton).toBeVisible()

  await app.dashPage.newMissionButton.click()
  await expect(app.registerPage.h2ProgramarMissao).toBeVisible()
  await app.registerPage.submitMissionForm(mission)
  await expect(app.toast.toastMessage).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})

test('não deve cadastrar com código de missão incorreto', async ({ app }) => {

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
  await app.loginPage.login(login.email, login.password)
  await expect(app.navbar.logoutButton).toBeVisible()

  await app.dashPage.newMissionButton.click()
  await expect(app.registerPage.h2ProgramarMissao).toBeVisible()
  await app.registerPage.submitMissionForm(mission)
  await expect(app.registerPage.errorMessageIdFormat).toContainText('Use o formato LP-0000')
})

test('não deve cadastrar com código de missão duplicado', async ({ app }) => {

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

  //Arrange: Deletar missão, reserva e ticket caso já existam no banco de dados
  await cleanMissionData(mission)
  await insertMission(mission)

  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login(login.email, login.password)
  await expect(app.navbar.logoutButton).toBeVisible()

  await app.dashPage.newMissionButton.click()
  await expect(app.registerPage.h2ProgramarMissao).toBeVisible()
  mission.returnDate = formatDate(mission.returnDate)
  await app.registerPage.submitMissionForm(mission)

  //Assert: Verificar se a mensagem de erro é exibida
  await expect(app.registerPage.errorMessageIdFormat).toContainText('Já existe uma missão com este ID.')
})