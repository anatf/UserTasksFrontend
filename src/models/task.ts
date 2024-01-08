export class Task {
    id!: number;
    userId!: number;
    description!: string;
    dueDate!: Date;
    completed!: boolean;
  success: any;
  message: any;
}

export class TaskWithUserName {
    id!: number;
    userId!: number;
    description!: string;
    dueDate!: Date;
    completed!: boolean;
    userName!: string;
}

