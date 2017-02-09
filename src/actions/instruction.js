export const INSTRUCTION = 'INSTRUCTION';

export function startInstruction(script) {
  return {
    type: INSTRUCTION,
    script,
  };
}
