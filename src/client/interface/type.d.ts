interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    deadline: number
    createdAt?: string
    updatedAt?: string
}

interface TodoProps {
    todo: ITodo
}

type ApiDataType = {
    name: string
    description: string
    status: string
    deadline: number
    todos: ITodo[]
    todo?: ITodo
}