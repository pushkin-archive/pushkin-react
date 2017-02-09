export const START_PROGRESS = 'START_PROGRESS';

export function startProgress(precent) {
  return {
    type: START_PROGRESS,
    precent,
  };
}
