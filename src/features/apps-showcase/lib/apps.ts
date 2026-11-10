import type { AppId } from '../../../shared/media/app-shots';

export const APP_ORDER: readonly AppId[] = ['ueno-bank', 'ueno-empresas', 'merkao', 'vizago-pay', 'siglo-21'];

/** Public store pages. Apps without an entry (Vizago Pay) have no public listing. */
export const storeHref: Partial<Record<AppId, string>> = {
  'siglo-21': 'https://apps.apple.com/us/app/universidad-siglo-21/id1538580954',
  'ueno-bank': 'https://apps.apple.com/us/app/ueno/id1592509395',
  'ueno-empresas': 'https://apps.apple.com/us/app/ueno-bank-empresas/id6443504744',
  merkao: 'https://apps.apple.com/us/app/merkao-todo-para-tu-negocio/id6474199279',
};
