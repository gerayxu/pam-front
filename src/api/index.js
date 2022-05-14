import {get, post, put} from "@/plugins/axios";

// meta
export const getMetas = () => get({url: "/metas"})

export const addMeta = (meta) => post({url: "/meta", data: meta})

export const editMeta = (meta) => put({url: "/meta", data: meta})

// role
export const getRoles = () => get({url: "/roles"})

export const addRole = (role) => post({url: "/role", data: role})

export const editRole = (role) => put({url: "/role", data: role})

// task
export const touchTask = (task) => post({url: "/task/touch", data: task})

export const getTasks = () => get({url: "/tasks"})

export const addTask = (task) => post({url: "/task", data: task})

export const editTask = (task) => put({url: "/task", data: task})

export const execTask = (id) => post({url: "/task/exec/" + id})

// users
export const getUserInfo = () => get({url: "/user"})

export const authUser = (user) => post({url: "/user/login", data: user})

export const getUsers = () => get({url: "/users"})

export const addUser = (user) => post({url: "/user", data: user})

export const logout = () => get({url: "/user/logout"})

export const userToken = () => get({url: "/user/token"})

// log
export const getLogs = (searchable) => post({url: "/logs", data: searchable})