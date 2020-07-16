type UpdateTime = null | number
type ActiveGroupMethod = 'date' | null // ??
type Status = 'UNCHECKED' | 'CHECKED' | 'DONE'
type RepeatMethod = 'TASK_REPEAT_OFF' | 'TASK_REPEAT_DAY'
type Note = string | null
type Labels = string[] | null

export interface CategoryType {
  lastUpdateDate: number,
  isSyncedWithAlexaUpdateTime: UpdateTime,
  default: boolean,
  activeGroupMethod: ActiveGroupMethod,
  nameUpdateTime: UpdateTime,
  isSyncedWithAlexa: boolean,
  id: string,
  isGroceryList: boolean,
  positionUpdateTime: UpdateTime,
  isDeleted: boolean,
  activeGroupMethodUpdateTime: UpdateTime,
  isSyncedWithGoogleAssistant: boolean,
  isSyncedWithGoogleAssistantUpdateTime: UpdateTime,
  isDefault: true,
  isGroceryListUpdateTime: UpdateTime,
  name: string,
  position: string,
  isDeletedUpdateTime: UpdateTime,
  isDefaultUpdateTime: UpdateTime,
}

export interface TaskType {
  alertUpdateTime: UpdateTime,
  assignedTo: string,
  assignedToUpdateTime: UpdateTime,
  categoryId: CategoryType['id'],
  categoryIdUpdateTime: UpdateTime,
  creationDate: number,
  dueDate: UpdateTime,
  dueDateUpdateTime: UpdateTime,
  globalTaskId: string,
  id: string,
  labels: Labels,
  labelsUpdateTime: UpdateTime,
  lastUpdateDate: UpdateTime,
  latitude: null, // ?
  longitude: null, // ?
  note: Note,
  noteUpdateTime: UpdateTime
  parentGlobalTaskId: null | string,
  participants: [],  // ?
  position: string,
  positionUpdateTime: UpdateTime,
  priority: 'Normal' | 'High',
  priorityUpdateTime: UpdateTime,
  repeatingMethod: RepeatMethod,
  shared: false, // ?
  status: Status,
  statusUpdateTime: UpdateTime,
  subTasks: [], // always empty array
  title: string, // name
  titleUpdateTime: UpdateTime,
  alert:
    {
      repeatDays: '0000000',
      repeatEndType: 'REPEAT_END_NEVER',
      repeatEndsOn: null,
      repeatInterval: 1,
      repeatEndsAfterOccurrences: -1,
      repeatMonthType: 'ON_DATE',
      type: 'NONE',
      customTime: 0,
      repeatStartsOn: null,
      repeatNextOccurrence: null,
      offset: 0
    },
}

interface Model<T> {
  items: T[],
  statusCode: number
}

interface ModelTypes {
  attachment: Model<any>,
  category: Model<CategoryType>,
  userNotification: Model<any>,
  sharedMember: Model<any>,
  task: Model<TaskType>,
  taskNotification: Model<any>,
}

export interface AnyDoResult {
  lastUpdate: number,
  models: ModelTypes,
}
