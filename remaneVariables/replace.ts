import { ReplacePattern } from './index';

export default (input: string, patterns: ReplacePattern[]): string => {
  patterns.forEach(p => {
    if (!p) return;
    input = input.split(p.from).join(p.to);
  });

  return input;
};
