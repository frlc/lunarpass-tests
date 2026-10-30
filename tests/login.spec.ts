import {test, expect} from '../support'



test.beforeEach(async ({ app }) => {
  //Arrange: Acessar a página de login  
  await app.loginPage.navigate()
})

test('Validar login com credenciais válidas nos controles de missões', async ({ app }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login('buzz@lunarpass.dev', 'pwd123')

  //Assert: Validar se o usuário foi redirecionado e se o botão de logout está visível
  await expect(app.loginPage.page).toHaveURL('http://localhost:3000/mission-control')
  await expect(app.navbar.logoutButton).toBeVisible()
})

test('Validar login com senha inválida nos controles de missões', async ({ app }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login('buzz@lunarpass.dev', '123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await expect(app.loginPage.errorMessage).toBeVisible()
  await expect(app.loginPage.errorMessage).toContainText('E-mail ou senha inválidos.')
})

test('Validar login com email inválido nos controles de missões', async ({ app }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login('buzz@lunarpass.pro', 'pwd123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await expect(app.loginPage.errorMessage).toBeVisible()
  await expect(app.loginPage.errorMessage).toContainText('E-mail ou senha inválidos.')
})

test('Validar login com email em branco nos controles de missões', async ({ app }) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login('', 'pwd123')

  //Assert: Validar mensagem de erro de login exibida na tela
  await expect(app.loginPage.errorMessage).toBeVisible()
  await expect(app.loginPage.errorMessage).toContainText('Informe um e-mail válido')
})

test('Validar login com senha em branco nos controles de missões', async ({ app}) => {
  //Act: Preencher os campos de login e senha e clicar no botão de login
  await app.loginPage.login('buzz@lunarpass.dev', '')

  //Assert: Validar mensagem de erro de login exibida na tela
  await expect(app.loginPage.errorMessage).toBeVisible()
  await expect(app.loginPage.errorMessage).toContainText('Informe a senha')
})

