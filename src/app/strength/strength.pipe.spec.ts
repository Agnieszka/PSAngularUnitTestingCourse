import {StrengthPipe} from "./strength.pipe";

describe('StreightPipe', () => {

  it('should display weak when strength is 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong when strength is 10', () =>{
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
