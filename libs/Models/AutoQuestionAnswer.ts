export interface IAutoQuestion {
  id: number;
  is_active: boolean;
  game_name: string;
  question: string;

  auto_answers?: IAutoAnswer[];
}

export interface IAutoAnswer {
  id: number;

  answer: string;
  rate: number;
  is_active: boolean;
  auto_question_id: number;
}
