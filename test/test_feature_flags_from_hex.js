const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');
const {throws} = require('node:assert').strict;

const {featureFlagsFromHex} = require('./../');

const tests = [
  {
    args: {},
    description: 'Serialized feature flags are required',
    error: 'ExpectedHexSerializedFeatureFlagsToDecode',
  },
  {
    args: {hex: '00020404'},
    description: 'Feature flags are sorted numerically',
    expected: {
      features: [
        {bit: 2, is_required: true, type: undefined},
        {bit: 10, is_required: true, type: 'gossip_queries_v2'},
      ],
    },
  },
  {
    args: {hex: '00018C'},
    description: 'Feature flags are returned',
    expected: {
      features: [
        {bit: 2, is_required: true, type: undefined},
        {bit: 3, is_required: false, type: 'requires_initial_graph'},
        {bit: 7, is_required: false, type: 'gossip_queries_v1'},
      ],
    },
  },
  {
    args: {hex: '000880000a2800000000'},
    description: 'Newly defined feature flags are returned',
    expected: {
      features: [
        {bit: 35, is_required: false, type: 'quiescence'},
        {bit: 37, is_required: false, type: 'attributable_failures'},
        {bit: 41, is_required: false, type: 'zero_fee_commitments'},
        {bit: 43, is_required: false, type: 'peer_storage'},
        {bit: 63, is_required: false, type: 'splicing'},
      ],
    },
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, (t, end) => {
    if (!!error) {
      throws(() => featureFlagsFromHex(args), new Error(error), 'Got error');
    } else {
      const res = featureFlagsFromHex(args);

      deepStrictEqual(res.features, expected.features, 'Got feature flags');
    }

    return end();
  });
});
