const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { describe, it } = require('node:test');

const packageRoot = join(__dirname, '..');

function load(subpath) {
  return require(join(packageRoot, 'dist', subpath, 'index.js'));
}

describe('public package surface', () => {
  it('loads every intentional exported subpath from its built entrypoint', () => {
    const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
    const expected = [
      './backend/iam',
      './backend/ndrive',
      './backend/lm-service',
      './backend/machine',
      './machine-service/sim',
      './machine-service/fms',
      './machine-service/inference',
    ];

    assert.deepEqual(Object.keys(packageJson.exports), expected);
    for (const subpath of expected) assert.doesNotThrow(() => load(subpath.slice(2)));
  });
});

describe('capability token semantics', () => {
  const { FmsOperationTokenSchema } = load('machine-service/fms');
  const { InferenceOperationTokenSchema } = load('machine-service/inference');

  it('accepts a well-formed FMS upload capability', () => {
    const claims = { id: 'blob-1', size: 1024, jti: 'upload-1', exp: 2_000_000_000 };
    assert.deepEqual(FmsOperationTokenSchema.parse(claims), claims);
  });

  it('rejects malformed FMS authorization constraints', () => {
    const valid = { id: 'blob-1', size: 1024, jti: 'upload-1', exp: 2_000_000_000 };
    const invalid = [
      { ...valid, id: '' },
      { ...valid, size: -1 },
      { ...valid, size: 1.5 },
      { ...valid, jti: '' },
      { ...valid, exp: 0 },
      { id: valid.id, size: valid.size, jti: valid.jti },
    ];
    for (const claims of invalid) assert.equal(FmsOperationTokenSchema.safeParse(claims).success, false);
  });

  it('accepts current inference issuer claims and rejects unknown claims fail-closed', () => {
    const claims = { jti: 'inference-1', iat: 1_999_999_900, exp: 2_000_000_000 };
    assert.deepEqual(InferenceOperationTokenSchema.parse(claims), claims);
    assert.equal(InferenceOperationTokenSchema.safeParse({ ...claims, maxTokens: 100 }).success, false);
  });

  it('rejects malformed inference claims', () => {
    const valid = { jti: 'inference-1', exp: 2_000_000_000 };
    const invalid = [
      { ...valid, jti: '' },
      { ...valid, exp: -1 },
      { ...valid, exp: 1.5 },
      { ...valid, iat: 'now' },
      { jti: valid.jti },
    ];
    for (const claims of invalid) assert.equal(InferenceOperationTokenSchema.safeParse(claims).success, false);
  });
});

describe('stable discriminants and enums', () => {
  it('keeps machine capability wire values stable', () => {
    const { MachineCapability } = load('backend/machine');
    assert.deepEqual(MachineCapability.options, ['compute', 'storage']);
  });

  it('accepts both SIM event variants and rejects an unknown discriminator', () => {
    const { TelemetryEventSchema } = load('machine-service/sim');
    const meta = { type: 'meta', data: { intervalMs: 5000 } };
    const telemetry = {
      type: 'telemetry',
      data: {
        uptimeSeconds: 60,
        network: {},
        cpu: { loadAverage: [] },
        memory: { totalMegabytes: 8, freeMegabytes: 4, usedMegabytes: 4, usedPercent: 50 },
        gpus: [],
        disks: [],
        collectedAt: '2026-01-01T00:00:00.000Z',
      },
    };

    assert.equal(TelemetryEventSchema.safeParse(meta).success, true);
    assert.equal(TelemetryEventSchema.safeParse(telemetry).success, true);
    assert.equal(TelemetryEventSchema.safeParse({ type: 'heartbeat', data: {} }).success, false);
  });
});

describe('authentication request semantics', () => {
  const { LoginWithCredentialsBody } = load('backend/iam');

  it('requires exactly one identifier', () => {
    assert.equal(LoginWithCredentialsBody.safeParse({ username: 'agent', password: 'password-1' }).success, true);
    assert.equal(LoginWithCredentialsBody.safeParse({ password: 'password-1' }).success, false);
    assert.equal(
      LoginWithCredentialsBody.safeParse({ username: 'agent', email: { address: 'agent@example.com' }, password: 'password-1' }).success,
      false,
    );
  });
});
