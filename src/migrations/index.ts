import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251221_150014 from './20251221_150014';
import * as migration_20251228_031933 from './20251228_031933';
import * as migration_20251229_160714 from './20251229_160714';
import * as migration_20260101_051254 from './20260101_051254';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251221_150014.up,
    down: migration_20251221_150014.down,
    name: '20251221_150014',
  },
  {
    up: migration_20251228_031933.up,
    down: migration_20251228_031933.down,
    name: '20251228_031933',
  },
  {
    up: migration_20251229_160714.up,
    down: migration_20251229_160714.down,
    name: '20251229_160714',
  },
  {
    up: migration_20260101_051254.up,
    down: migration_20260101_051254.down,
    name: '20260101_051254'
  },
];
