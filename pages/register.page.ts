import { Page, Locator, expect} from "@playwright/test"
import { Mission } from "../support/mission"

export class RegisterPage {
    readonly page: Page
    readonly h2ProgramarMissao: Locator
    readonly idInput: Locator
    readonly rocketInput: Locator
    readonly lunarBaseSelect: Locator
    readonly departureDateInput: Locator
    readonly returnDateInput: Locator
    readonly priceInput: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
        this.page = page
        this.h2ProgramarMissao = page.getByRole('heading', { name: 'Programar missão' })
        this.idInput = page.getByRole('textbox', { name: 'ID da missão' })
        this.rocketInput = page.getByRole('textbox', { name: 'Foguete' })
        this.lunarBaseSelect = page.getByLabel('Base lunar')
        this.departureDateInput = page.getByRole('textbox', { name: 'Data de partida' })
        this.returnDateInput = page.getByTestId('mission-form-return-date')
        this.priceInput = page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' })
        this.saveButton = page.getByRole('button', { name: 'Salvar missão' })
    }

   async submitMissionForm(mission: Mission) {
        await this.idInput.fill(mission.id)
        await this.rocketInput.fill(mission.rocket)
        await this.lunarBaseSelect.selectOption(mission.lunarBase)
        await this.departureDateInput.fill(mission.departureDate)
        await expect(this.returnDateInput).toContainText(mission.returnDate)
        await this.priceInput.fill(mission.price.toString())
        await this.saveButton.click()
    }
}