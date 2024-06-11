import { test, expect } from '@playwright/test';

// test('Sign In', async ({ page }) => {
//   await page.goto('http://localhost:4200/sign-in');

//   await page.waitForTimeout(1000)

//   await page.getByLabel('Username').fill('emilys');
//   await page.getByLabel('Password').fill('emilyspass')
//   await page.getByRole("button", { name: 'Sign In' }).click()

//   const dialog = await page.waitForEvent('dialog');

//   expect(dialog.type()).toBe('alert');
//   expect(dialog.message()).toContain('Sign In successful!');
//   await dialog.accept();
//   await page.waitForTimeout(1000)
// });

// test('Sign Up', async ({ page }) => {
//   await page.goto('http://localhost:4200/sign-up');

//   await page.waitForTimeout(1000)

//   await page.getByLabel('Username').fill('harry');
//   await page.getByLabel('Email').fill('harry@gmail.com');
//   await page.getByLabel('Password',{exact:true}).fill('harry@123')
//   await page.getByLabel('Confirm Password').fill('harry@123')
//   await page.getByLabel('Contact Number').fill('45435453454')
//   await page.getByRole("button", { name: 'Sign Up' }).click()

//   const dialog = await page.waitForEvent('dialog');

//   expect(dialog.type()).toBe('alert');
//   expect(dialog.message()).toContain('Sign Up successful!');
//   await dialog.accept();
//   await page.waitForTimeout(1000)

// });


// test('Search Products', async ({ page }) => {
//   await page.goto('http://localhost:4200');

//   await page.getByRole("textbox").fill("shirt")

//   await page.getByRole('list').getByRole("button").click()

//   await page.waitForSelector(".products")

//   await page.waitForLoadState('networkidle');

//   expect((await page.waitForSelector(".card"))).toBeDefined()

// });

// test('Add to Cart', async ({ page }) => {
//   await page.goto('http://localhost:4200/products');

//   await page.waitForTimeout(1000);

//   await page.waitForLoadState('networkidle');

//   await page.waitForSelector(".card")

//   await page.getByRole("button",{name:"Add to Cart"}).first().click()
//   await page.getByRole("button",{name:"Add to Cart"}).last().click()

//   await page.click(".cart-icon")

//   await page.waitForTimeout(1500);

//   const cartLengthString = await page.$eval('.cart-length', cartLengthElement => cartLengthElement.innerHTML);
//   const cartLengthNumber = parseInt(cartLengthString);

//   expect(cartLengthNumber).toBeGreaterThan(0)
// });

// test('Add to Cart (Single Product)', async ({ page }) => {
//   await page.goto('http://localhost:4200/products/3');

//   await page.waitForTimeout(1000);

//   await page.waitForLoadState('networkidle');

//   await page.waitForSelector(".product")

//   await page.click(".increment-btn")

//   await page.getByRole("button",{name:"Add to cart"}).first().click()

//   await page.click(".cart-icon")

//   await page.waitForTimeout(1000);

//   await page.waitForLoadState('networkidle');

//   const cartLengthString = await page.$eval('.cart-length', cartLengthElement => cartLengthElement.innerHTML);
//   const cartLengthNumber = parseInt(cartLengthString);

//   expect(cartLengthNumber).toBeGreaterThan(0)
// });

test('Complete flow', async ({ page }) => {
  await page.goto('/sign-up');

  await page.waitForTimeout(1000)

  await page.getByLabel('Username').fill('harry');
  await page.getByLabel('Email').fill('harry@gmail.com');
  await page.getByLabel('Password',{exact:true}).fill('harry@123')
  await page.getByLabel('Confirm Password').fill('harry@123')
  await page.getByLabel('Contact Number').fill('45435453454')
  await page.getByRole("button", { name: 'Sign Up' }).click()

  const signUpDialog = await page.waitForEvent('dialog');

  expect(signUpDialog.type()).toBe('alert');
  expect(signUpDialog.message()).toContain('Sign Up successful!');
  await signUpDialog.accept();
  await page.waitForTimeout(1500)
  await page.goto('/sign-in');

  await page.waitForTimeout(1000)

  await page.getByLabel('Username').fill('emilys');
  await page.getByLabel('Password').fill('emilyspass')
  await page.getByRole("button", { name: 'Sign In' }).click()

  const signInDialog = await page.waitForEvent('dialog');

  expect(signInDialog.type()).toBe('alert');
  expect(signInDialog.message()).toContain('Sign In successful!');

  await signInDialog.accept()
  await page.waitForTimeout(1500)

  await page.getByRole("textbox").fill("shirt")

  await page.getByRole('list').getByRole("button").click()

  await page.waitForTimeout(1500)

  await page.waitForSelector(".products")

  await page.waitForLoadState('networkidle');

  expect((await page.waitForSelector(".card"))).toBeDefined()

  // const num = Math.ceil(Math.random()*30)

  // await page.goto(`http://localhost:4200/products/${num}`);

  // await page.waitForTimeout(1500);

  // await page.waitForLoadState('networkidle');

  // await page.waitForSelector(".product")

  await page.getByRole("button",{name:"Add to cart"}).first().click()
  
  await page.getByRole("button",{name:"Add to cart"}).last().click()

  await page.waitForTimeout(1500)

  await page.click(".cart-icon")

  await page.waitForTimeout(2000);

  await page.waitForLoadState('networkidle');

  const cartLengthString = await page.$eval('.cart-length', cartLengthElement => cartLengthElement.innerHTML);
  const cartLengthNumber = parseInt(cartLengthString);

  expect(cartLengthNumber).toBeGreaterThan(0)

  await page.getByRole("button",{name:"Checkout"}).click()

  await page.waitForTimeout(1500);

  await page.getByLabel('Cash').check();

  await page.waitForTimeout(1500);

  await page.getByRole("button",{name:"Place Order"}).click()

  await page.waitForTimeout(2000)

  const currentUrl = await page.url();
  expect(currentUrl).toBe('http://localhost:4200/products');
});


// test('Prevent access of checkout to UnAuth User', async ({ page }) => {
//   await page.goto('http://localhost:4200/products/1');

//   await page.waitForTimeout(1500);

//   await page.waitForLoadState('networkidle');

//   await page.waitForSelector(".product")

//   await page.getByRole("button",{name:"Add to cart"}).first().click()

//   await page.click(".cart-icon")

//   await page.waitForTimeout(1500);

//   await page.waitForLoadState('networkidle');

//   const cartLengthString = await page.$eval('.cart-length', cartLengthElement => cartLengthElement.innerHTML);
//   const cartLengthNumber = parseInt(cartLengthString);

//   expect(cartLengthNumber).toBeGreaterThan(0)

//   await page.getByRole("button",{name:"Checkout"}).click()

//   await page.waitForTimeout(1000)
//   const currentUrl = await page.url();
//   expect(currentUrl).toBe('http://localhost:4200/sign-in');
// });