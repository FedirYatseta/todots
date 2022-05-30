import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:9090/authors"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    debugger
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/get"
        )
        debugger
        return todos
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addTodo = async (

    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        debugger
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            deadline: formData.deadline,
            status: false,
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/create",
            todo
        )
        return saveTodo
    } catch (error: any) {
        throw new Error(error)
    }
}


export const updateTodo = async (

    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        debugger
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.patch(
            `${baseUrl}/update/${todo._id}`,
            todoUpdate
        )
        return updatedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}


export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete/${_id}`
        )
        debugger
        return deletedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}