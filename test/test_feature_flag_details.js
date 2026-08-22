const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');
const {throws} = require('node:assert').strict;

const {featureFlagDetails} = require('./../');

const tests = [
  {
    args: {},
    description: 'A bit is required',
    error: 'ExpectedBitNumberToGetFeatureFlagDetails',
  },
  {
    args: {bit: 0},
    description: 'A feature flag is returned',
    expected: {type: 'data_loss_protection'},
  },
  {
    args: {bit: 34},
    description: 'A quiescence feature flag is returned',
    expected: {type: 'quiescence'},
  },
  {
    args: {bit: 36},
    description: 'An attributable failures feature flag is returned',
    expected: {type: 'attributable_failures'},
  },
  {
    args: {bit: 40},
    description: 'A zero fee commitments feature flag is returned',
    expected: {type: 'zero_fee_commitments'},
  },
  {
    args: {bit: 42},
    description: 'A peer storage feature flag is returned',
    expected: {type: 'peer_storage'},
  },
  {
    args: {bit: 62},
    description: 'A splicing feature flag is returned',
    expected: {type: 'splicing'},
  },
  {
    args: {bit: Number.MAX_SAFE_INTEGER},
    description: 'No feature flag is known',
    expected: {},
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, (t, end) => {
    if (!!error) {
      throws(() => featureFlagDetails(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagDetails(args);

      deepStrictEqual(res.type, expected.type, 'Got expected type');
    }

    return end();
  });
});
