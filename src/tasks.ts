import {TaskType} from './anydo.types'

export class Tasks {
  private readonly _tasks?: TaskType[]
  public readonly filter: { <S extends TaskType>(callbackfn: (value: TaskType, index: number, array: TaskType[]) => value is S, thisArg?: any): S[]; (callbackfn: (value: TaskType, index: number, array: TaskType[]) => unknown, thisArg?: any): TaskType[] };
  public readonly map: <U>(callbackfn: (value: TaskType, index: number, array: TaskType[]) => U, thisArg?: any) => U[];
  public readonly find: { <S extends TaskType>(predicate: (this: void, value: TaskType, index: number, obj: TaskType[]) => value is S, thisArg?: any): (S | undefined); (predicate: (value: TaskType, index: number, obj: TaskType[]) => unknown, thisArg?: any): (TaskType | undefined) };

  constructor(tasks: TaskType[]) {
    this._tasks = [...tasks]
    this.filter = this._tasks.filter.bind(this._tasks)
    this.map = this._tasks.map.bind(this._tasks)
    this.find = this._tasks.find.bind(this._tasks)
  }

  getTasksName() {
    return this.map((task) => task.title)
  }

  getTasksForToday() {
    const today = new Date()
    const todayTasks = this.filter((task) => task.dueDate && (task.dueDate < today.getTime()))

    return (new Tasks(todayTasks)).getTasksName()
  }
}
