import {AnyDoResult, CategoryType, TaskType} from './anydo.types'
import {Tasks} from "./tasks";
import {idGenerator} from "./utils";

const request = require('request-promise-native')

const API_URL = 'https://sm-prod2.any.do'

interface TaskCreate {
  title: string,
  dueDate: number,
  id: string,
}

export class AnyDoApi {
  private authToken?: string
  private readonly loginState?: Promise<void>
  private _tasks?: TaskType[]
  private _categories?: CategoryType[]

  constructor(email: string, password: string) {
    if (!email || !password) {
      throw Error('Email and Password are required.')
    }

    this.loginState = this.login(email, password)
  }

  private async login(email: string, password: string) {
    const loginResponse = await request
      .post({
        uri: `${API_URL}/login`,
        body: {email, password},
        json: true
      })

    this.authToken = loginResponse.auth_token
  }

  private async sync(taskSync?: TaskCreate) {
    if (!this.authToken) {
      await this.loginState
    }

    const taskItems = taskSync ? [taskSync] : []

    const syncResult: AnyDoResult = await request({
      uri: `${API_URL}/api/v2/me/sync`,
      method: 'POST',
      headers: {
        'X-Anydo-Auth': this.authToken,
        'Content-Type': 'application/json'
      },
      json: true,
      body: {
        models: {
          category: {
            items: []
          },
          task: {
            items: taskItems,
            config: {includeDone: false, includeDeleted: false}
          }
        }
      },
    })

    this._tasks = syncResult.models.task.items
    this._categories = syncResult.models.category.items
      .filter((category) => !category.isDeleted)
  }

  public async getTaskList(): Promise<Tasks> {
    await this.sync()

    if (!this._tasks) {
      throw Error('Synchronization error occurred.')
    }

    return new Tasks(this._tasks)
  }

  public async getCategoryList(): Promise<readonly CategoryType[]> {
    await this.sync()

    if (!this._categories) {
      throw Error('Synchronization error occurred.')
    }

    return [...this._categories]
  }

  public async findTasksByCategoryName(categoryName: string): Promise<Tasks> {
    const categories = await this.getCategoryList()
    const categoryMatch = categories.find((category) => category.name === categoryName)

    if (!categoryMatch) {
      throw Error('Could not find category with the given name.')
    }

    const tasks = await this.getTaskList()

    return new Tasks(tasks.filter((task) => task.categoryId === categoryMatch.id))
  }

  public async findTasksByDefaultCategory(): Promise<Tasks> {
    const categories = await this.getCategoryList()
    const defaultCategory = categories.find((category) => category.default)

    if (!defaultCategory) {
      throw Error('Could not find default category.')
    }

    const tasks = await this.getTaskList()

    return new Tasks(tasks.filter((task) => task.categoryId === defaultCategory.id))
  }

  public async addTask(addTaskOption: string | TaskCreate) {
    let syncOption: TaskCreate

    if (typeof addTaskOption === 'string') {
      syncOption = {
        title: addTaskOption,
        dueDate: Date.now(),
        id: idGenerator(),
      }
    } else {
      syncOption = addTaskOption
    }

    await this.sync(syncOption)
  }
}
