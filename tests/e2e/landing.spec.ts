import { expect, test } from '@playwright/test';

const SECTION_IDS = ['timeline', 'career', 'architecture', 'apps', 'bio', 'contact'];

test.describe('landing @smoke', () => {
  for (const locale of ['es', 'en'] as const) {
    test(`/${locale}/ renders its own copy without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto(`/${locale}/`);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1, name: 'Esteban Farias' })).toBeVisible();
      await expect(page.getByText(locale === 'es' ? 'Apps que la gente usa todos los días.' : 'Apps people open every day.')).toBeVisible();
      for (const id of SECTION_IDS) await expect(page.locator(`#${id}`)).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test('hero CTAs point to the public email and the CV of the locale', async ({ page }) => {
    await page.goto('/en/');
    const hero = page.locator('#hero');
    await expect(hero.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:colocaps@gmail.com');
    await expect(hero.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv/esteban-farias-cv-en.pdf');
  });

  test('architecture copy states the Flux and FPA facts', async ({ page }) => {
    await page.goto('/es/');
    const architecture = page.locator('#architecture');
    await expect(architecture).toContainText('hasta 24 h');
    await expect(architecture).toContainText('~3 minutos');
    await expect(architecture.getByRole('heading', { name: 'Flutter Performance Agent (FPA)' })).toBeVisible();
    await expect(architecture).toContainText('New Relic');
  });

  test('the timeline jumps to the itti chapter', async ({ page }) => {
    await page.goto('/es/#timeline');
    await page.locator('#timeline').getByRole('link', { name: /itti/ }).click();
    await expect(page).toHaveURL(/#chapter-itti$/);
    await expect(page.locator('#chapter-itti')).toBeInViewport();
  });

  test('the locale toggle switches language and keeps the hash', async ({ page }) => {
    await page.goto('/es/#contact');
    // Until the island hydrates the link is a plain anchor that drops the hash.
    await expect(page.locator('astro-island[component-url*="locale-toggle"]')).not.toHaveAttribute('ssr');
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/#contact$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    expect(await page.evaluate(() => localStorage.getItem('locale'))).toBe('en');
  });

  test('the apps row lists the five apps and their store links', async ({ page }) => {
    await page.goto('/en/');
    const apps = page.locator('#apps');
    for (const name of ['ueno bank', 'ueno empresas', 'Merkao', 'Vizago Pay', 'Siglo 21']) {
      await expect(apps.getByRole('heading', { name })).toHaveCount(1);
    }
    await expect(apps.getByRole('link', { name: /View on the App Store/ })).toHaveCount(4);
  });

  test('the page never scrolls sideways', async ({ page }) => {
    await page.goto('/es/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBe(0);
  });
});

test.describe('root redirect @smoke', () => {
  test.use({ locale: 'en-US' });

  test('follows the browser language', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test('a stored choice wins over the browser language and keeps the hash', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('locale', 'es'));
    await page.goto('/#career');
    await expect(page).toHaveURL(/\/es\/#career$/);
  });
});

test.describe('root redirect fallback', () => {
  test.use({ locale: 'de-DE' });

  test('falls back to es', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/es\/$/);
  });
});

test.describe('mobile layout @smoke', () => {
  test('the header keeps brand and locale toggle on one row at 390', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile project only');
    await page.goto('/es/');
    const brand = await page.getByRole('link', { name: 'Esteban Farias, inicio' }).boundingBox();
    const toggle = await page.getByRole('group', { name: 'Idioma' }).boundingBox();
    expect(brand && toggle && Math.abs(brand.y - toggle.y) < 40).toBe(true);
    expect(toggle && toggle.x + toggle.width <= 390).toBe(true);
  });

  test('the timeline is a horizontal scroller, not a wrapped grid', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile project only');
    await page.goto('/es/');
    const rail = page.locator('#timeline ol');
    const { scrollWidth, clientWidth } = await rail.evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    expect(scrollWidth).toBeGreaterThan(clientWidth);
  });
});
