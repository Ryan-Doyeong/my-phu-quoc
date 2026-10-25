// 사전 타입 — 영어(en) 사전 구조가 기준이다.
import type { en } from './locales/en'

type Widen<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends (...args: infer A) => infer R
  ? (...args: A) => Widen<R>
  : T extends readonly (infer U)[]
  ? readonly Widen<U>[]
  : T extends object
  ? { [K in keyof T]: Widen<T[K]> }
  : T

export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly unknown[]
  ? T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

/** 완성된 사전 (영어 기준 구조) */
export type Dictionary = Widen<typeof en>

/** 언어별 사전 입력값: 빠진 키는 영어로 자동 대체된다. 없는 키를 쓰면 타입 오류. */
export type DictionaryInput = DeepPartial<Dictionary>
