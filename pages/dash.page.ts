import { Page, Locator, expect} from "@playwright/test"

export class DashPage {
    readonly page: Page
    readonly newMissionButton: Locator

    constructor(page: Page) {
        this.page = page
        this.newMissionButton = page.getByRole('link', { name: 'Nova missão' })
    }


    
}