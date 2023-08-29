import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

  const scenarios = [
    {
      title: 'capitalizes single character string',
      input: 'm',
      output: 'M'
    },
    {
      title: 'capitalizes a single word string',
      input: 'mehul',
      output: 'Mehul'
    },
    {
      title: 'capitalizes a multi word string',
      input: 'mehul chopra',
      output: 'Mehul chopra'
    },
    {
      title: 'manages empty string',
      input: '',
      output: ''
    }
  ];

  scenarios.forEach(({ title, input, output}) => {
    it(title, () => {
      const pipe = new CapitalizePipe();
      expect(pipe.transform(input)).toBe(output);
    });
  });
});
