describe('Simple Math', () => {
  it('should add two numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should multiply two numbers correctly', () => {
    expect(3 * 4).toBe(12);
  });
});

describe('String Operations', () => {
  it('should concatenate strings', () => {
    expect('Hello' + ' ' + 'World').toBe('Hello World');
  });

  it('should check string length', () => {
    expect('BrightTrack'.length).toBe(11);
  });
});

describe('Array Operations', () => {
  it('should filter arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    const evenNumbers = numbers.filter(n => n % 2 === 0);
    expect(evenNumbers).toEqual([2, 4]);
  });

  it('should map arrays', () => {
    const numbers = [1, 2, 3];
    const doubled = numbers.map(n => n * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });
});
