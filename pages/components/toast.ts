import { Page, Locator, expect} from "@playwright/test"

export class Toast {
    readonly page: Page
    readonly toastMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.toastMessage = page.getByRole('listitem')
    }
}