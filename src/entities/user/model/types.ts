import { UserStatus } from "@/pages/TrainsPage/TrainsPage";

type Exercise = {
  exercize_id: number;
  title: string;
  description: string | null;
  title_photo: string;
  weight: string | null;
  repetitions: number;
  approaches: number;
  duration: number;
  break_duration: number;
  load_cns: number;
  muscle_group: string;
};

export type Training = {
  training_id: number;
  title: string;
  title_photo: string;
  training_duration: number;
  exercizes: Exercise[];
};

export type SelectSample = {
  sample_id: number;
  sample_title: string;
  description: string;
  trainings: Training[];
  duration_weeks?: number;
  total_trainings?: number;
  focus?: {
    cardio: number;
    muscle: number;
  };
  session_time?: string;
  overview?: string;
  stages?: string[];
};

export type User = {
  user: {
    user_id: number;
    username: string;
    fullname: string;
    club_id: number | null;
    trainer_id: number | null;
    subscription: {
      service_title: string;
      end_date: string | null;
      start_date?: string;
    } | null;
  };
  select_samples:
    | SelectSample[]
    | UserStatus.REQUIRED_ANCET
    | UserStatus.SELECTED;
};
