import { describe, expect, test } from 'bun:test';
import * as core from '../index';

describe('@lodash-v2/core exports', () => {
  test('array 함수들이 export 되어 있음', () => {
    expect(typeof core.chunk).toBe('function');
    expect(typeof core.compact).toBe('function');
    expect(typeof core.head).toBe('function');
    expect(typeof core.uniq).toBe('function');
  });

  test('collection 함수들이 export 되어 있음', () => {
    expect(typeof core.map).toBe('function');
    expect(typeof core.filter).toBe('function');
    expect(typeof core.reduce).toBe('function');
  });

  test('lang 함수들이 export 되어 있음', () => {
    expect(typeof core.isArray).toBe('function');
    expect(typeof core.cloneDeep).toBe('function');
  });

  test('모든 플레이스홀더는 함수이고 호출 시 undefined 반환', () => {
    expect(core.chunk()).toBeUndefined();
    expect(core.identity()).toBeUndefined();
  });
});
