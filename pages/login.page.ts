import { Page, Locator, expect} from "@playwright/test"

export class LoginPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('Informe seu email')
        this.passwordInput = page.getByPlaceholder('Sua senha secreta')
        this.loginButton = page.getByRole('button', { name: 'Entrar' })
        this.errorMessage = page.getByRole('alert')
    }

    async navigate() {
        await this.page.goto('http://localhost:3000/mission-control/login')

        const title = await this.page.getByRole('heading', { name: 'Mission Control' })
        await expect(title).toBeVisible()

    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async getErrorMessage(message: string) {
        return await this.errorMessage.textContent()
    }
}