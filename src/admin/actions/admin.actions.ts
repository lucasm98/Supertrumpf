export const DELETE = 'DELETE';
export type DELETE = typeof DELETE;

export interface DeleteCardAction {
  type: DELETE;
  payload: number;
}

export function deleteCardAction(id: number): DeleteCardAction {
  return {
    type: DELETE as DELETE,
    payload: id,
  };
}