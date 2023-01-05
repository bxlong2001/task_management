import {createSlice} from "@reduxjs/toolkit"

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        submitProject: {
            isSubmit: false,
        },
        projects: {
            isFetching: false,
            allProjects: [],
            error: false
        },
    },
    reducers:{
        getAllProjectsStart: (state) => {
            state.projects.isFetching = true
        },
        
        getAllProjectsSuccess: (state, action) => {
            state.projects.isFetching = false
            state.projects.allProjects = action.payload
        },

        getAllProjectsFail: (state) => {
            state.projects.isFetching = false
            state.projects.error = true
        },

        editProjectStart: (state) => {
            state.projects.isFetching = true
        },

        editProjectSuccess: (state: any, action) => {
            state.projects.isFetching = false
            state.projects.allProjects = state.projects.allProjects.map((project: any) => project._id === action.payload._id ? action.payload : project)
        },

        editProjectFail: (state) => {
            state.projects.isFetching = false
            state.projects.error = true
        },

        deleteProjectStart: (state) => {
            state.projects.isFetching = true
        },

        deleteProjectSuccess: (state: any, action) => {
            state.projects.isFetching = false
            state.projects.allProjects = state.projects.allProjects.filter((project: any) => project._id !== action.payload)
        },

        deleteProjectFail: (state: any) => {
            state.projects.isFetching = false
            state.projects.error = true
        }
    }
})

export const {
    getAllProjectsStart,
    getAllProjectsSuccess,
    getAllProjectsFail,
    editProjectStart,
    editProjectSuccess,
    editProjectFail,
    deleteProjectStart,
    deleteProjectSuccess,
    deleteProjectFail
} = projectSlice.actions
export default projectSlice.reducer