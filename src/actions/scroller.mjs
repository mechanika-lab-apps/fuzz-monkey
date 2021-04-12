import delay from 'delay';
import * as utils from '../utils.mjs';

export default async function scroller({ page, helpers }) {
  const { height, width } = await page.eval(() => ({
    height: document.documentElement.scrollHeight - window.innerHeight,
    width: document.documentElement.scrollWidth - window.innerWidth
  }));

  const top = utils.randomBetween(0, height);
  const left = utils.randomBetween(0, width);

  await page.evaluate(
    ({ top, left }) =>
      window.scroll({
        top,
        left: 0,
        behavior: 'smooth'
      }),
    { top, left }
  );

  await delay(1000);

  return void helpers.log('scroller', `Scrolled to ${top}, ${left}`);
}
