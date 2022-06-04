interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    deadline: date
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
    deadline: date
    todos: ITodo[]
    todo?: ITodo
}