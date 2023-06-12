import { test, expect } from '@playwright/test';
import { seed } from '../src/seed.js';
import { Operation, History } from '../src/models.js'

test.describe('test', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await seed();
  })

  test('Deberia tener como titulo de pagina recalc', async ({ page }) => {
    await page.goto('./');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/recalc/i);
  });

  test('Deberia poder realizar una resta', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '7' }).click()
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '-' }).click()
    await page.getByRole('button', { name: '9' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/sub/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(70);

    await expect(page.getByTestId('display')).toHaveValue(/70/)

    const operation = await Operation.findOne({
      where: {
        name: "SUB"
      }
    });

  

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(79)
    expect(historyEntry.secondArg).toEqual(9)
    expect(historyEntry.result).toEqual(70)
  });

  test('Deberia poder realizar una multiplicacion', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '*' }).click()
    await page.getByRole('button', { name: '5' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/multi/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(25);

    await expect(page.getByTestId('display')).toHaveValue(/25/)

    const operation = await Operation.findOne({
      where: {
        name: "MUL"
      }
    });

  

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(5)
    expect(historyEntry.secondArg).toEqual(5)
    expect(historyEntry.result).toEqual(25)
  });

  test('Deberia poder realizar una suma', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '8' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '1' }).click()
    await page.getByRole('button', { name: '3' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/add/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(21);

    await expect(page.getByTestId('display')).toHaveValue(/21/)

    const operation = await Operation.findOne({
      where: {
        name: "ADD"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(8)
    expect(historyEntry.secondArg).toEqual(13)
    expect(historyEntry.result).toEqual(21)
  });

  test('Deberia poder realizar una división', async ({ page }) => {
    await page.goto('./');
  
    await page.getByRole('button', { name: '8' }).click()
    await page.getByRole('button', { name: '/' }).click()
    await page.getByRole('button', { name: '4' }).click()
  
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);
  
    const { result } = await response.json();
    expect(result).toBe(2);
  
    await expect(page.getByTestId('display')).toHaveValue(/2/)
  
    const operation = await Operation.findOne({
      where: {
        name: "DIV"
      }
    });
  
    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })
  
    expect(historyEntry.firstArg).toEqual(8)
    expect(historyEntry.secondArg).toEqual(4)
    expect(historyEntry.result).toEqual(2)
  });
  
  test('Deberia poder realizar la operacion potencia',async({ page})=>{
    await page.goto('./');
  
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '^2' }).click()
  
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/pow/')),
      page.getByRole('button', { name: '=' }).click()
    ]);
  
    const { result } = await response.json();
    expect(result).toBe(25);
  
    await expect(page.getByTestId('display')).toHaveValue(/25/)
  
    const operation = await Operation.findOne({
      where: {
        name: "POW"
      }
    });
  
    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })
  
      expect(historyEntry.firstArg).toEqual(5)
      expect(historyEntry.result).toEqual(25)
  });


  test('Deberia poder borrar el display',async({ page})=>{
    await page.goto('./');
  
    await page.getByRole('button', { name: '7' }).click()
    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '+' }).click()
  
    await page.getByRole('button', { name: 'c' }).click()
    
    await expect(page.getByTestId('display')).toHaveValue("")
  
  });

  test('Deberia poder realizar la conversión de decimal a binario',async({ page})=>{
    await page.goto('./');
  
    await page.getByRole('button', { name: '4' }).click()
    await page.getByRole('button', { name: 'bin' }).click()
  
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/bin/')),
      page.getByRole('button', { name: '=' }).click()
    ]);
  
    const { result } = await response.json();
    expect(result).toBe("100");
  
    await expect(page.getByTestId('display')).toHaveValue(/100/)
  
    const operation = await Operation.findOne({
      where: {
        name: "BIN"
      }
    });
  
    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })
  
      expect(historyEntry.firstArg).toEqual(4)
      expect(historyEntry.result).toEqual(100)
  });

})


