import { TaskType } from './anydo.types'

export class Tasks {
  private readonly _tasks?: TaskType[]
  public readonly filter: { <S extends TaskType>(callbackfn: (value: TaskType, index: number, array: TaskType[]) => value is S, thisArg?: any): S[]; (callbackfn: (value: TaskType, index: number, array: TaskType[]) => unknown, thisArg?: any): TaskType[] }
  public readonly map: <U>(callbackfn: (value: TaskType, index: number, array: TaskType[]) => U, thisArg?: any) => U[]
  public readonly find: { <S extends TaskType>(predicate: (this: void, value: TaskType, index: number, obj: TaskType[]) => value is S, thisArg?: any): (S | undefined); (predicate: (value: TaskType, index: number, obj: TaskType[]) => unknown, thisArg?: any): (TaskType | undefined) }

  constructor(tasks: TaskType[]) {
    this._tasks = [ ...tasks ]
    this.filter = this._tasks.filter.bind(this._tasks)
    this.map = this._tasks.map.bind(this._tasks)
    this.find = this._tasks.find.bind(this._tasks)
  }

  get() {
    return this._tasks
  }

  getTasksName() {
    return this.map((task) => task.title)
  }

  getTasksForToday(includeChecked: boolean = false) {
    const tomorrow = new Date()

    tomorrow.setHours(0, 0, 0, 0)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayTasks = this
      .filter((task) => task.dueDate && (task.dueDate < tomorrow.getTime()))
      .filter((task) => includeChecked ? true : task.status === 'UNCHECKED')

    return (new Tasks(todayTasks)).getTasksName()
  }

  isEmpty() {
    return !this._tasks?.length
  }
}
