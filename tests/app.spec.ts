import { test, expect } from '@playwright/test'

test('Validar título da página', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lunar Pass/)
})
