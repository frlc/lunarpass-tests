import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { Navbar } from '../pages/components/navbar'

let loginPage: LoginPage
let navbar: Navbar

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  navbar = new Navbar(page)

  //Arrange: Acessar a página de login  
  await loginPage.navigate()
})

test('Validar login com credenciais válidas nos controles de missões', async ({ page }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login('buzz@lunarpass.dev', 'pwd123')

  //Assert: Validar se o botão de logout está visível após o login
  await expect(navbar.logoutButton).toBeVisible()
})

test('Validar login com senha inválida nos controles de missões', async ({ page }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login('buzz@lunarpass.dev', '123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await loginPage.getErrorMessage('E-mail ou senha inválidos.')
})

test('Validar login com email inválido nos controles de missões', async ({ page }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login('buzz@lunarpass.pro', 'pwd123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await loginPage.getErrorMessage('E-mail ou senha inválidos.')
})

test('Validar login com email em branco nos controles de missões', async ({ page }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login('', 'pwd123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await loginPage.getErrorMessage('Informe um e-mail válido')
})

test('Validar login com senha em branco nos controles de missões', async ({ page }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await loginPage.login('buzz@lunarpass.dev', '')

  //Assert: Validar mensagem de erro de login exibida na tela
  await loginPage.getErrorMessage('Informe a senha')
})

