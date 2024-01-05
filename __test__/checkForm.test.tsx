import { describe, it } from 'node:test';
import { expect } from 'chai';
import { checkForm } from '../utils/utilityAnalysis/calculation';

describe('checkForm', () => {
  it('should return true when all attributes are set, weights are numbers, sum of weights is 100, and no duplicate criteria', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria2', weight: '50' },
    ];
    expect(checkForm(params)).to.be.true;
  });

  it('should return error message when some attributes are not set', () => {
    const params = [
      { criteria: '', weight: '50' },
      { criteria: 'Criteria2', weight: '50' },
    ];
    expect(checkForm(params)).to.equal('Some attributes are not set - Please check your input');
  });

  it('should return error message when some weights are not numbers', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria2', weight: 'not a number' },
    ];
    expect(checkForm(params)).to.equal('Some attributes are not numbers - Please check your input');
  });

  it('should return error message when sum of weights is not 100', () => {
    const params = [
      { criteria: 'Criteria1', weight: '30' },
      { criteria: 'Criteria2', weight: '30' },
    ];
    expect(checkForm(params)).to.equal('Sum of weights is not 100% - Please check your input');
  });

  it('should return error message when some criteria are duplicate', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria1', weight: '50' },
    ];
    expect(checkForm(params)).to.equal('Some criteria are double - Please check your input');
  });
});
