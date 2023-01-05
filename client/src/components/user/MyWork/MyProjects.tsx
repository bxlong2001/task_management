import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { deleteProject, getProjects } from '../../../redux/api/apiProjectRequest';
import ModalLayout from '../../layout/Modal/Modal';
import EditProject from '../../project/EditProject';

const MyProjects = () => {
  const dispatch = useDispatch()
  const {allProjects, isFeching} = useSelector((state: any) => state.project.projects)
  
  useEffect(() => {
    if(!allProjects.length)
      getProjects(dispatch)
  }, [])

  const onDeleteProject = async (id: string) => {
    try {
      const res = await deleteProject(dispatch, id)
      if(res.success)
        return toast.success('Xóa project thành công')
      return toast.error('Xóa project thất bại')
    } catch (error) {
      console.log(error);
    }
  }

  if(isFeching)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
  )

  return (
    <>
      <ToastContainer theme='colored'/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th colSpan={4}>Name</th>
            <th colSpan={4}>Owner</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {allProjects?.map((project: any, index: number) => {
            return (
              <tr key={project.Name}>
                <td>{index+1}</td>
                <td colSpan={4}>{project.Name}</td>
                <td colSpan={4}>{project.Owner.email}</td>
                <td>{project.Status}</td>
                <td>{moment.utc(project.StartDate).format('L')}</td>
                <td>{moment.utc(project?.EndDate).format('L')}</td>
                <td>
                  <ModalLayout ComponentToPassDown={() => <EditProject project={project}/>}/>
                  <Button variant='danger'>
                    <FontAwesomeIcon icon={faTrash} onClick={() => onDeleteProject(project._id)}/>
                  </Button>
                </td>
              </tr>
            )})}
        </tbody>
      </Table>
    </>
  )
}

export default MyProjects
