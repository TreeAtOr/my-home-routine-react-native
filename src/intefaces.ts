export interface IRoutine {
  id: string;
  name: string;
  achived: boolean
}

export type repeatSchemas = 'd' | 'w' | 'm' | '2' | '3'

export interface ITemplate {
  id: number,
  text: string,
  home_id: number,
  repeat: repeatSchemas
}