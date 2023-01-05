import axios from "axios"
import { apiUrl } from "../../contexts/constaints"
import { ProjectForm } from "../../interface"
import { deleteProjectFail, deleteProjectStart, deleteProjectSuccess, editProjectFail, editProjectStart, editProjectSuccess, getAllProjectsFail, getAllProjectsStart, getAllProjectsSuccess } from "../projectSlice"

export const newProject = async (newProjectForm: ProjectForm) => {
    try {
        const res = await axios.post(apiUrl + 'projects/newProject', newProjectForm)

        if(res.data.success) {
            return res.data
        }

        return res.data
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const getProjects = async (dispatch: any) => {
    dispatch(getAllProjectsStart())
    try {
        const res = await axios.get(apiUrl + 'projects/projectList')

        if(res.data.success) {
            dispatch(getAllProjectsSuccess(res.data.projects))     
            return res.data
        }
        dispatch(getAllProjectsFail())
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const editProject = async (dispatch: any, id: string, projectForm: ProjectForm) => {
    dispatch(editProjectStart())
    try {
        const response = await axios.put(apiUrl + `projects/editProject/${id}`, projectForm)
        
        if(response.data.success) {
            dispatch(editProjectSuccess(response.data.project))
            return response.data
        }
        dispatch(editProjectFail())
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}

export const deleteProject = async (dispatch:any, id: string) => {
    dispatch(deleteProjectStart())
    try {
        const response = await axios.delete(apiUrl + `projects/deleteProject/${id}`)
        
        if(response.data.success) {
            dispatch(deleteProjectSuccess(response.data.id))
            return response.data
        }
        dispatch(deleteProjectFail())
    } catch (error: any) {
        if (error.response.data)
                return error.response.data
            else
                return {success: false, message: error.message}
    }
}