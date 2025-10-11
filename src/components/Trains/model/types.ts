export type Training = {
  id: number;
  sample_type: string;
  title_photo: string | null;
  training_sample_id: number;
  title: string;
  schedule: string;
  duration?: number;
};

export type Exercise = {
  id: number;
  title: string;
  description: string | null;
  title_photo: string;
  video_file: string;
  from_trainer: string | null;
  weight: number | null;
  repetitions: number;
  of_date: string;
  approaches: number;
  duration: number;
  break_duration: number;
  load_cns: number;
  documentation?: string;
  muscle_group?: string;
};
